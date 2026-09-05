import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { emitBookingEvent } from "./events";
import { toDriverBooking, toPublicBooking, type BookingStatus, type StoredBooking } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

type StoreFile = {
  bookings: StoredBooking[];
  idempotency: Record<string, string>;
};

const memory: StoreFile = { bookings: [], idempotency: {} };
let loaded = false;
let writeChain = Promise.resolve();

function withLock<T>(fn: () => Promise<T>) {
  const run = writeChain.then(fn, fn);
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function load() {
  if (loaded) return;
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoreFile;
    memory.bookings = parsed.bookings ?? [];
    memory.idempotency = parsed.idempotency ?? {};
  } catch {
    memory.bookings = [];
    memory.idempotency = {};
  }
  loaded = true;
}

async function persist() {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(memory, null, 2), "utf8");
}

function generateReference() {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 5; i += 1) token += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `BCN-${token}`;
}

function uniqueReference() {
  let reference = generateReference();
  while (memory.bookings.some((booking) => booking.reference === reference)) {
    reference = generateReference();
  }
  return reference;
}

function viewToken() {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64url");
}

export async function createBooking(
  input: Omit<StoredBooking, "reference" | "viewToken" | "status" | "createdAt" | "updatedAt" | "driverWhatsApp" | "customerWhatsApp" | "notifyError">,
  idempotencyKey?: string,
) {
  return withLock(async () => {
    await load();
    if (idempotencyKey && memory.idempotency[idempotencyKey]) {
      const existing = memory.bookings.find((booking) => booking.reference === memory.idempotency[idempotencyKey]);
      if (existing) return { booking: existing, created: false };
    }

    const now = new Date().toISOString();
    const booking: StoredBooking = {
      ...input,
      reference: uniqueReference(),
      viewToken: viewToken(),
      status: "awaiting_confirmation",
      createdAt: now,
      updatedAt: now,
      idempotencyKey,
      driverWhatsApp: "pending",
      customerWhatsApp: "pending",
    };
    memory.bookings.unshift(booking);
    if (idempotencyKey) memory.idempotency[idempotencyKey] = booking.reference;
    await persist();
    emitBookingEvent({
      type: "booking.created",
      reference: booking.reference,
      status: booking.status,
      at: now,
    });
    return { booking, created: true };
  });
}

export async function getBooking(reference: string) {
  await load();
  return memory.bookings.find((booking) => booking.reference === reference) ?? null;
}

export async function listBookings() {
  await load();
  return memory.bookings.map(toDriverBooking);
}

export async function updateBooking(
  reference: string,
  patch: Partial<Pick<StoredBooking, "status" | "driverWhatsApp" | "customerWhatsApp" | "notifyError">>,
) {
  return withLock(async () => {
    await load();
    const booking = memory.bookings.find((item) => item.reference === reference);
    if (!booking) return null;
    Object.assign(booking, patch, { updatedAt: new Date().toISOString() });
    await persist();
    emitBookingEvent({
      type: "booking.updated",
      reference: booking.reference,
      status: booking.status,
      at: booking.updatedAt,
    });
    return booking;
  });
}

export async function setBookingStatus(reference: string, status: BookingStatus) {
  return updateBooking(reference, { status });
}

export function publicView(booking: StoredBooking) {
  return toPublicBooking(booking);
}

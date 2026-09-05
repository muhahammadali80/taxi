import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "htx_driver";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.DRIVER_SESSION_SECRET || (process.env.NODE_ENV === "development" ? "dev-driver-session" : "");
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function driverPassword() {
  return process.env.DRIVER_DASHBOARD_PASSWORD || (process.env.NODE_ENV === "development" ? "hammad-driver" : "");
}

export async function createDriverSession() {
  if (!secret() || !driverPassword()) {
    throw new Error("Driver dashboard is not configured");
  }
  const issued = String(Date.now());
  const token = `${issued}.${sign(issued)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearDriverSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isDriverAuthenticated() {
  if (!secret() || !driverPassword()) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const [issued, signature] = token.split(".");
  if (!issued || !signature) return false;
  const expected = sign(issued);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  const age = Date.now() - Number(issued);
  return Number.isFinite(age) && age >= 0 && age < MAX_AGE * 1000;
}

export function passwordMatches(input: string) {
  const expected = driverPassword();
  if (!expected) return false;
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

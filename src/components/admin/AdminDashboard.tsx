"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Driver } from "@/lib/supabase/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPhone(phone: string) {
  // Normalise display: keep as-is (already stored formatted)
  return phone;
}

function validatePhone(phone: string) {
  const stripped = phone.replace(/\s+/g, "");
  return /^[\d+\-() ]{7,20}$/.test(stripped);
}

function validateName(name: string) {
  return name.trim().length >= 2 && name.trim().length <= 60;
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        border: "2px solid rgba(26,26,26,0.2)",
        borderTopColor: "#1a1a1a",
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

// ─── DriverCard ───────────────────────────────────────────────────────────────

function DriverCard({
  driver,
  onActivate,
  onEdit,
  onDelete,
  activating,
  deleting,
}: {
  driver: Driver;
  onActivate: (id: string) => void;
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
  activating: boolean;
  deleting: boolean;
}) {
  return (
    <div
      style={{
        background: driver.active
          ? "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)"
          : "#ffffff",
        borderRadius: "1.1rem",
        padding: "1.25rem 1.5rem",
        border: driver.active
          ? "2px solid #ffc72c"
          : "2px solid transparent",
        boxShadow: driver.active
          ? "0 8px 24px -8px rgba(255,199,44,0.25)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        transition: "all 300ms ease",
      }}
    >
      {/* Left: info */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: driver.active ? "#ffc72c" : "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            {driver.name}
          </span>
          {driver.active && (
            <span
              style={{
                background: "#22c55e",
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.15rem 0.55rem",
                borderRadius: "99px",
              }}
            >
              Active
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: driver.active ? "rgba(255,255,255,0.55)" : "#555",
            marginTop: "0.2rem",
            fontFamily: "monospace",
            letterSpacing: "0.03em",
          }}
        >
          {formatPhone(driver.phone)}
        </p>
      </div>

      {/* Right: actions */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", flexShrink: 0 }}>
        {!driver.active && (
          <button
            id={`make-active-${driver.id}`}
            onClick={() => onActivate(driver.id)}
            disabled={activating}
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: "0.6rem",
              border: "2px solid #22c55e",
              background: "transparent",
              color: "#22c55e",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: activating ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              whiteSpace: "nowrap",
              transition: "all 150ms",
              opacity: activating ? 0.6 : 1,
            }}
          >
            {activating && <Spinner size={12} />}
            Make Active
          </button>
        )}
        <button
          id={`edit-driver-${driver.id}`}
          onClick={() => onEdit(driver)}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "0.6rem",
            border: "2px solid rgba(26,26,26,0.15)",
            background: "transparent",
            color: driver.active ? "rgba(255,255,255,0.7)" : "#333",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 150ms",
          }}
        >
          Edit
        </button>
        <button
          id={`delete-driver-${driver.id}`}
          onClick={() => onDelete(driver)}
          disabled={deleting}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "0.6rem",
            border: "2px solid rgba(220,38,38,0.3)",
            background: "transparent",
            color: "#dc2626",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: deleting ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            transition: "all 150ms",
            opacity: deleting ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          {deleting && <Spinner size={12} />}
          Delete
        </button>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "1.25rem",
          padding: "1.75rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 24px 60px -12px rgba(0,0,0,0.35)",
        }}
      >
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "1.25rem",
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

// ─── DriverForm ───────────────────────────────────────────────────────────────

function DriverForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial?: { name: string; phone: string };
  onSave: (name: string, phone: string) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: { name?: string; phone?: string } = {};
    if (!validateName(name)) errs.name = "Name must be 2–60 characters.";
    if (!validatePhone(phone))
      errs.phone = "Enter a valid phone number (e.g. 07222 222222).";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSave(name.trim(), phone.trim());
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1.5px solid #e5e5e5",
    background: "#fafafa",
    color: "#1a1a1a",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 200ms",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#555",
    marginBottom: "0.4rem",
    letterSpacing: "0.04em",
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="driver-name" style={labelStyle}>
          Driver name
        </label>
        <input
          id="driver-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ali"
          style={{
            ...fieldStyle,
            borderColor: errors.name ? "#dc2626" : "#e5e5e5",
          }}
          autoFocus
        />
        {errors.name && (
          <p style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: "0.3rem" }}>
            {errors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="driver-phone" style={labelStyle}>
          Phone number
        </label>
        <input
          id="driver-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 07222 222222"
          style={{
            ...fieldStyle,
            borderColor: errors.phone ? "#dc2626" : "#e5e5e5",
          }}
        />
        {errors.phone && (
          <p style={{ color: "#dc2626", fontSize: "0.78rem", marginTop: "0.3rem" }}>
            {errors.phone}
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "0.75rem",
            border: "1.5px solid #e5e5e5",
            background: "transparent",
            color: "#555",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          id="save-driver-btn"
          type="submit"
          disabled={saving}
          style={{
            flex: 2,
            padding: "0.8rem",
            borderRadius: "0.75rem",
            border: "none",
            background: saving ? "rgba(255,199,44,0.5)" : "#ffc72c",
            color: "#1a1a1a",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: saving ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {saving && <Spinner size={14} />}
          {saving ? "Saving…" : "Save driver"}
        </button>
      </div>
    </form>
  );
}

// ─── DeleteConfirm ────────────────────────────────────────────────────────────

function DeleteConfirm({
  driver,
  onConfirm,
  onCancel,
  deleting,
}: {
  driver: Driver;
  onConfirm: () => void;
  onCancel: () => void;
  deleting: boolean;
}) {
  return (
    <div>
      <p style={{ color: "#555", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.55 }}>
        Are you sure you want to delete{" "}
        <strong style={{ color: "#1a1a1a" }}>{driver.name}</strong>? This
        cannot be undone.
      </p>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "0.8rem",
            borderRadius: "0.75rem",
            border: "1.5px solid #e5e5e5",
            background: "transparent",
            color: "#555",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          id="confirm-delete-btn"
          type="button"
          onClick={onConfirm}
          disabled={deleting}
          style={{
            flex: 2,
            padding: "0.8rem",
            borderRadius: "0.75rem",
            border: "none",
            background: deleting ? "rgba(220,38,38,0.4)" : "#dc2626",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: deleting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {deleting && <Spinner size={14} />}
          {deleting ? "Deleting…" : "Yes, delete"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

type ModalState =
  | { type: "none" }
  | { type: "add" }
  | { type: "edit"; driver: Driver }
  | { type: "delete"; driver: Driver };

export function AdminDashboard({ initialDrivers }: { initialDrivers: Driver[] }) {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loggingOut, startLogout] = useTransition();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const supabase = createClient();
  const activeDriver = drivers.find((d) => d.active) ?? null;

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Activate a driver ─────────────────────────────────────────────────────

  async function handleActivate(id: string) {
    setActivatingId(id);
    try {
      // Deactivate all, then activate the chosen one
      const { error: deactivateErr } = await supabase
        .from("drivers")
        .update({ active: false } as { active: boolean })
        .neq("id", id);

      if (deactivateErr) throw deactivateErr;

      const { data: updated, error: activateErr } = await supabase
        .from("drivers")
        .update({ active: true } as { active: boolean })
        .eq("id", id)
        .select()
        .single();

      if (activateErr) throw activateErr;

      setDrivers((prev) =>
        prev.map((d) => ({ ...d, active: d.id === id ? true : false })),
      );
      showToast(`${(updated as Driver).name} is now the active driver.`);
    } catch (err) {
      console.error(err);
      showToast("Failed to change active driver. Please try again.", false);
    } finally {
      setActivatingId(null);
    }
  }

  // ── Add driver ────────────────────────────────────────────────────────────

  async function handleAdd(name: string, phone: string) {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("drivers")
        .insert({ name, phone, active: false })
        .select()
        .single();

      if (error) throw error;

      const inserted = data as Driver;
      setDrivers((prev) => [...prev, inserted]);
      setModal({ type: "none" });
      showToast(`${inserted.name} added successfully.`);
    } catch (err) {
      console.error(err);
      showToast("Failed to add driver. Please try again.", false);
    } finally {
      setSaving(false);
    }
  }

  // ── Edit driver ───────────────────────────────────────────────────────────

  async function handleEdit(name: string, phone: string) {
    if (modal.type !== "edit") return;
    const id = modal.driver.id;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("drivers")
        .update({ name, phone })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const updated = data as Driver;
      setDrivers((prev) => prev.map((d) => (d.id === id ? updated : d)));
      setModal({ type: "none" });
      showToast(`${updated.name} updated.`);
    } catch (err) {
      console.error(err);
      showToast("Failed to update driver. Please try again.", false);
    } finally {
      setSaving(false);
    }
  }

  // ── Delete driver ─────────────────────────────────────────────────────────

  async function handleDelete() {
    if (modal.type !== "delete") return;
    const { driver } = modal;
    setDeletingId(driver.id);
    try {
      const { error } = await supabase
        .from("drivers")
        .delete()
        .eq("id", driver.id);

      if (error) throw error;

      setDrivers((prev) => prev.filter((d) => d.id !== driver.id));
      setModal({ type: "none" });
      showToast(`${driver.name} deleted.`);
    } catch (err) {
      console.error(err);
      showToast("Failed to delete driver. Please try again.", false);
    } finally {
      setDeletingId(null);
    }
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  function handleLogout() {
    startLogout(async () => {
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    });
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f4f1; }
        button:hover { opacity: 0.88; }
      `}</style>

      {/* ── Toast ── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            background: toast.ok ? "#1a1a1a" : "#dc2626",
            color: "#fff",
            padding: "0.7rem 1.25rem",
            borderRadius: "99px",
            fontSize: "0.875rem",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            whiteSpace: "nowrap",
            animation: "slideIn 250ms ease",
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Modals ── */}
      {modal.type === "add" && (
        <Modal title="Add new driver" onClose={() => setModal({ type: "none" })}>
          <DriverForm
            onSave={handleAdd}
            onCancel={() => setModal({ type: "none" })}
            saving={saving}
          />
        </Modal>
      )}
      {modal.type === "edit" && (
        <Modal
          title={`Edit ${modal.driver.name}`}
          onClose={() => setModal({ type: "none" })}
        >
          <DriverForm
            initial={{ name: modal.driver.name, phone: modal.driver.phone }}
            onSave={handleEdit}
            onCancel={() => setModal({ type: "none" })}
            saving={saving}
          />
        </Modal>
      )}
      {modal.type === "delete" && (
        <Modal
          title="Delete driver?"
          onClose={() => setModal({ type: "none" })}
        >
          <DeleteConfirm
            driver={modal.driver}
            onConfirm={handleDelete}
            onCancel={() => setModal({ type: "none" })}
            deleting={deletingId === modal.driver.id}
          />
        </Modal>
      )}

      {/* ── Page ── */}
      <div
        style={{
          minHeight: "100dvh",
          background: "#f5f4f1",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            background: "#1a1a1a",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0 1.5rem",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "#ffc72c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "#1a1a1a",
                flexShrink: 0,
              }}
            >
              T
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,199,44,0.55)",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Taxi
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#ffc72c",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                }}
              >
                TapTaxiBcn Admin
              </p>
            </div>
          </div>

          <button
            id="logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "0.6rem",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: loggingOut ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 150ms",
            }}
          >
            {loggingOut && <Spinner size={12} />}
            {loggingOut ? "Signing out…" : "Logout"}
          </button>
        </header>

        {/* Main content */}
        <main style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              marginBottom: "0.25rem",
            }}
          >
            Taxi Admin Dashboard
          </h1>
          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "2rem" }}>
            Manage which driver is active and receiving customer calls.
          </p>

          {/* ── Currently Active Driver ── */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#888",
                marginBottom: "0.75rem",
              }}
            >
              Currently Active Driver
            </h2>

            {activeDriver ? (
              <div
                style={{
                  background: "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                  borderRadius: "1.1rem",
                  padding: "1.5rem",
                  border: "2px solid #ffc72c",
                  boxShadow: "0 8px 32px -8px rgba(255,199,44,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(255,199,44,0.15)",
                    border: "2px solid rgba(255,199,44,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#ffc72c",
                    flexShrink: 0,
                  }}
                >
                  {activeDriver.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#ffc72c",
                    }}
                  >
                    {activeDriver.name}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "monospace",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {activeDriver.phone}
                  </p>
                </div>
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#22c55e",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "99px",
                    flexShrink: 0,
                  }}
                >
                  Active
                </span>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "1.1rem",
                  padding: "1.5rem",
                  border: "2px dashed #e5e5e5",
                  textAlign: "center",
                  color: "#aaa",
                  fontSize: "0.9rem",
                }}
              >
                No driver is currently active. Select one below.
              </div>
            )}
          </section>

          {/* ── All Drivers ── */}
          <section>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                All Drivers ({drivers.length})
              </h2>
              <button
                id="add-driver-btn"
                onClick={() => setModal({ type: "add" })}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "0.6rem",
                  border: "none",
                  background: "#ffc72c",
                  color: "#1a1a1a",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                + Add Driver
              </button>
            </div>

            {drivers.length === 0 ? (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "1.1rem",
                  padding: "2rem",
                  border: "2px dashed #e5e5e5",
                  textAlign: "center",
                  color: "#aaa",
                  fontSize: "0.9rem",
                }}
              >
                No drivers yet. Click &ldquo;+ Add Driver&rdquo; to get started.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* Active driver first */}
                {[...drivers]
                  .sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0))
                  .map((driver) => (
                    <DriverCard
                      key={driver.id}
                      driver={driver}
                      onActivate={handleActivate}
                      onEdit={(d) => setModal({ type: "edit", driver: d })}
                      onDelete={(d) => setModal({ type: "delete", driver: d })}
                      activating={activatingId === driver.id}
                      deleting={deletingId === driver.id}
                    />
                  ))}
              </div>
            )}
          </section>

          {/* Help note */}
          <div
            style={{
              marginTop: "2.5rem",
              background: "rgba(255,199,44,0.08)",
              border: "1px solid rgba(255,199,44,0.25)",
              borderRadius: "0.85rem",
              padding: "1rem 1.25rem",
              fontSize: "0.8rem",
              color: "#7a6a20",
              lineHeight: 1.6,
            }}
          >
            <strong>Tip:</strong> When you click &ldquo;Make Active&rdquo;, the
            website&apos;s Call Now and WhatsApp buttons will instantly update to
            use that driver&apos;s number — no restart needed.
          </div>
        </main>
      </div>
    </>
  );
}

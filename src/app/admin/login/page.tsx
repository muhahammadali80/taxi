"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "var(--font-jakarta), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#ffc72c",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "1rem",
            }}
          >
            T
          </div>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              color: "rgba(255,199,44,0.6)",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            Taxi
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffc72c",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            TapTaxiBcn
          </p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)" }}>
            Admin portal
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#242424",
            borderRadius: "1.5rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7)",
          }}
        >
          <h1
            style={{
              fontSize: "1.35rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "0.4rem",
            }}
          >
            Sign in
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "1.75rem",
            }}
          >
            Enter your credentials to access the dashboard.
          </p>

          {error && (
            <div
              role="alert"
              style={{
                background: "rgba(255,107,0,0.12)",
                border: "1px solid rgba(255,107,0,0.35)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                color: "#ff8c3a",
                fontSize: "0.85rem",
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="admin-email"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  borderRadius: "0.85rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#1a1a1a",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 200ms",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(255,199,44,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                htmlFor="admin-password"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  borderRadius: "0.85rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#1a1a1a",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 200ms",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(255,199,44,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem 1rem",
                borderRadius: "0.85rem",
                border: "none",
                background: loading
                  ? "rgba(255,199,44,0.5)"
                  : "#ffc72c",
                color: "#1a1a1a",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 200ms, transform 100ms",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(26,26,26,0.3)",
                      borderTopColor: "#1a1a1a",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Authorised personnel only
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

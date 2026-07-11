import { useState } from "react";
import { api } from "../api.js";
import { ACCENT } from "../theme.js";

const DEMO_EMAIL = "demo@microfin.io";
const DEMO_PASSWORD = "demo1234";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.login(email, password);
      onLogin(res.user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", background: "#F5F7FA" }}>
      {/* Brand panel */}
      <div style={{ flex: 1.1, position: "relative", background: "#0B1F3A", display: "flex", flexDirection: "column", justifyContent: "center", padding: 88, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(46,107,230,.35),transparent 70%)", animation: "pulseGlow 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: -160, left: -100, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(14,124,97,.28),transparent 70%)", animation: "pulseGlow 6s ease-in-out infinite 1s" }} />
        <div style={{ position: "relative", zIndex: 1, animation: "loginBrandIn .6s ease both" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 28 }}>MF</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 34, color: "#fff", letterSpacing: "-.02em", lineHeight: 1.15 }}>MicroFin OS</div>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,.62)", marginTop: 14, maxWidth: 420, lineHeight: 1.6 }}>
            Unified operations platform for microfinance institutions — HR, finance, credit, and client services in one system.
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 48 }}>
            {[["42", "Branches"], ["3,920", "Active clients"], ["96%", "Collection rate"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff" }}>{v}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div style={{ flex: 1, maxWidth: 460, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: 64, animation: "loginSlideIn .55s ease both" }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 26, color: "#101828" }}>Welcome back</div>
        <div style={{ fontSize: 14, color: "#64748B", marginTop: 8, marginBottom: 36 }}>Sign in to your operations dashboard</div>

        <label style={{ fontSize: 12.5, fontWeight: 600, color: "#344054", marginBottom: 6, display: "block" }}>Work email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="you@microfin.io"
          style={{ width: "100%", padding: "12px 14px", border: "1px solid #D0D5DD", borderRadius: 9, fontSize: 14, marginBottom: 20, color: "#101828" }}
        />

        <label style={{ fontSize: 12.5, fontWeight: 600, color: "#344054", marginBottom: 6, display: "block" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="********"
          style={{ width: "100%", padding: "12px 14px", border: "1px solid #D0D5DD", borderRadius: 9, fontSize: 14, marginBottom: 28, color: "#101828" }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ width: "100%", padding: 13, border: "none", borderRadius: 9, background: ACCENT, color: "#fff", fontSize: 14.5, fontWeight: 600, cursor: loading ? "wait" : "pointer", opacity: hover && !loading ? 0.9 : 1, transition: "opacity .15s" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error && (
          <div style={{ fontSize: 12.5, color: "#DC2626", marginTop: 14, textAlign: "center" }}>{error}</div>
        )}
        <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 16, textAlign: "center" }}>
          Demo credentials pre-filled — just click Sign in
        </div>
      </div>
    </div>
  );
}

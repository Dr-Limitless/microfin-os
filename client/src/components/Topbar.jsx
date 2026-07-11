import { ACCENT } from "../theme.js";

export default function Topbar({ title }) {
  return (
    <div style={{ height: 64, flex: "none", background: "#fff", borderBottom: "1px solid #E4E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#101828" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <input
          placeholder="Search clients, loans, employees..."
          style={{ width: 280, padding: "9px 14px", border: "1px solid #E4E8F0", borderRadius: 8, fontSize: 13, background: "#F8FAFC", color: "#101828" }}
        />
        <div style={{ position: "relative", width: 34, height: 34, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, position: "absolute", top: 6, right: 7 }} />
          <div style={{ width: 14, height: 14, border: "2px solid #64748B", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}

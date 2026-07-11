const shimmerBase = {
  background: "linear-gradient(90deg,#F1F5F9 25%,#E9EDF3 37%,#F1F5F9 63%)",
  backgroundSize: "400px 100%",
  animation: "shimmer 1.6s ease-in-out infinite",
};

export default function Placeholder({ title }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#101828" }}>{title}</div>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#B45309", background: "#FEF3C7", padding: "4px 10px", borderRadius: 20 }}>Coming soon</span>
      </div>
      <div style={{ fontSize: 13.5, color: "#64748B", marginBottom: 28 }}>This module is scaffolded and wired into navigation, ready to be designed next.</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 16 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ ...shimmerBase, height: 96, borderRadius: 14, border: "1px solid #E4E8F0" }} />
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 22 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ ...shimmerBase, height: 14, borderRadius: 6, marginBottom: i === 4 ? 0 : 14, width: i % 2 === 0 ? "92%" : "68%" }} />
        ))}
      </div>
    </div>
  );
}

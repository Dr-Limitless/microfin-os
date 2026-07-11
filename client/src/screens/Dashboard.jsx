import { useEffect, useRef, useState } from "react";
import { api } from "../api.js";
import { ACCENT } from "../theme.js";

const formatKpi = (card, value) => {
  if (card.format === "number") return value.toLocaleString();
  if (card.format === "percent") return value + "%";
  return String(value);
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [kpi, setKpi] = useState({ loans: 0, clients: 0, branches: 0, collection: 0 });
  const [chartGrown, setChartGrown] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    api.dashboard().then((d) => {
      if (cancelled) return;
      setData(d);
      animateKpis(d.kpiTargets);
    });
    return () => {
      cancelled = true;
      clearInterval(intervalRef.current);
    };
  }, []);

  const animateKpis = (target) => {
    clearInterval(intervalRef.current);
    setKpi({ loans: 0, clients: 0, branches: 0, collection: 0 });
    setChartGrown(false);
    let step = 0;
    const steps = 26;
    intervalRef.current = setInterval(() => {
      step++;
      const t = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setKpi({
        loans: Math.round(target.loans * ease),
        clients: Math.round(target.clients * ease),
        branches: Math.round(target.branches * ease),
        collection: Math.round(target.collection * ease),
      });
      if (t >= 1) {
        clearInterval(intervalRef.current);
        setChartGrown(true);
      }
    }, 28);
  };

  if (!data) return null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26 }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 24, color: "#101828" }}>Good afternoon, Alex</div>
          <div style={{ fontSize: 13.5, color: "#64748B", marginTop: 4 }}>Wednesday, July 10, 2026 · Portfolio snapshot across all branches</div>
        </div>
        <button style={{ padding: "10px 18px", border: "1px solid #D0D5DD", borderRadius: 8, background: "#fff", fontSize: 13.5, fontWeight: 600, color: "#344054" }}>Export report</button>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {data.kpiCards.map((card) => (
          <div key={card.key} style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>{card.label}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 28, color: "#101828", marginTop: 10 }}>
              {formatKpi(card, kpi[card.key])}
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 10, color: card.positive ? "#15803D" : "#DC2626" }}>
              {card.delta} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Chart + activity */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 22 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, color: "#101828", marginBottom: 18 }}>Disbursement trend</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 180, padding: "0 6px" }}>
            {data.chartData.map((bar, i) => (
              <div key={bar.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                <div style={{ width: "60%", maxWidth: 34, borderRadius: "6px 6px 0 0", background: ACCENT, height: chartGrown ? bar.pct + "%" : "0%", transition: "height .8s cubic-bezier(.22,1,.36,1)", transitionDelay: i * 60 + "ms" }} />
                <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 10 }}>{bar.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 22 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, color: "#101828", marginBottom: 16 }}>Recent activity</div>
          {data.activity.map((act, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #F8FAFC", animation: "fadeInUp .4s ease both", animationDelay: i * 70 + "ms" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, marginTop: 5, flex: "none" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#344054" }}>{act.text}</div>
                <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 2 }}>{act.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch bars */}
      <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 22 }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, color: "#101828", marginBottom: 16 }}>Loan portfolio by branch</div>
        {data.branchData.map((b) => (
          <div key={b.name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#475467", marginBottom: 6 }}>
              <span>{b.name}</span>
              <span style={{ fontWeight: 600, color: "#101828" }}>{b.pct}%</span>
            </div>
            <div style={{ height: 8, background: "#F1F5F9", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 5, background: ACCENT, width: chartGrown ? b.pct + "%" : "0%", transition: "width .8s cubic-bezier(.22,1,.36,1)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

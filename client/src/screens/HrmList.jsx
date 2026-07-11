import { useEffect, useState } from "react";
import { api } from "../api.js";
import { ACCENT, badgeStyle } from "../theme.js";

const GRID = "2.2fr 1.3fr 1.6fr 1fr 1.1fr";

export default function HrmList({ onOpen, onNewHire }) {
  const [employees, setEmployees] = useState([]);
  const [hoverId, setHoverId] = useState(null);

  useEffect(() => {
    api.employees().then(setEmployees).catch(() => setEmployees([]));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#101828" }}>Employee records</div>
          <div style={{ fontSize: 13.5, color: "#64748B", marginTop: 4 }}>{employees.length} employees across all departments</div>
        </div>
        <button onClick={onNewHire} style={{ padding: "11px 18px", border: "none", borderRadius: 8, background: ACCENT, color: "#fff", fontSize: 13.5, fontWeight: 600 }}>+ New hire</button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: GRID, padding: "14px 20px", background: "#F8FAFC", borderBottom: "1px solid #E4E8F0", fontSize: 11.5, fontWeight: 700, color: "#64748B", letterSpacing: ".03em", textTransform: "uppercase" }}>
          <div>Employee</div><div>Department</div><div>Role</div><div>Status</div><div>Hire date</div>
        </div>
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => onOpen(emp.id)}
            onMouseEnter={() => setHoverId(emp.id)}
            onMouseLeave={() => setHoverId(null)}
            style={{ display: "grid", gridTemplateColumns: GRID, padding: "14px 20px", borderBottom: "1px solid #F1F5F9", alignItems: "center", cursor: "pointer", transition: "background .12s", background: hoverId === emp.id ? "#F8FAFC" : "#fff" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EEF2FF", color: "#3730A3", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{emp.initials}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#101828" }}>{emp.name}</div>
            </div>
            <div style={{ fontSize: 13, color: "#475467" }}>{emp.department}</div>
            <div style={{ fontSize: 13, color: "#475467" }}>{emp.role}</div>
            <div><span style={badgeStyle(emp.status)}>{emp.status}</span></div>
            <div style={{ fontSize: 13, color: "#475467" }}>{emp.hireDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

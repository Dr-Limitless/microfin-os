import { useEffect, useState } from "react";
import { api } from "../api.js";
import { ACCENT, badgeStyle } from "../theme.js";
import { ARROW_LEFT, MDOT, CHECK } from "../glyphs.js";

const Field = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 13.5, color: "#344054" }}>{value || "—"}</div>
  </div>
);

const Card = ({ title, delay, children }) => (
  <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 22, animation: `fadeInUp ${delay}s ease both` }}>
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14.5, color: "#101828", marginBottom: 16 }}>{title}</div>
    {children}
  </div>
);

export default function HrmDetail({ employeeId, onBack }) {
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    if (!employeeId) return;
    api.employee(employeeId).then(setEmp).catch(() => setEmp(null));
  }, [employeeId]);

  if (!emp) return null;

  return (
    <div>
      <div onClick={onBack} style={{ fontSize: 13, color: "#475467", cursor: "pointer", marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}>
        {ARROW_LEFT} Back to employee records
      </div>

      <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 26, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, animation: "fadeInUp .35s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#EEF2FF", color: "#3730A3", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{emp.initials}</div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 19, color: "#101828" }}>{emp.name}</div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 3 }}>{emp.role} {MDOT} {emp.department}</div>
          </div>
          <span style={{ ...badgeStyle(emp.status), marginLeft: 8 }}>{emp.status}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ padding: "9px 16px", border: "1px solid #D0D5DD", borderRadius: 8, background: "#fff", fontSize: 13, fontWeight: 600, color: "#344054" }}>Message</button>
          <button style={{ padding: "9px 16px", border: "none", borderRadius: 8, background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 600 }}>Edit profile</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card title="Personal information" delay={0.4}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 16, columnGap: 12 }}>
            <Field label="Email" value={emp.email} />
            <Field label="Phone" value={emp.phone} />
            <Field label="Date of birth" value={emp.dob} />
            <Field label="Address" value={emp.address} />
          </div>
        </Card>
        <Card title="Employment information" delay={0.45}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 16, columnGap: 12 }}>
            <Field label="Employee ID" value={emp.id} />
            <Field label="Manager" value={emp.manager} />
            <Field label="Employment type" value={emp.employmentType} />
            <Field label="Hire date" value={emp.hireDate} />
          </div>
        </Card>
      </div>

      <Card title="Onboarding progress" delay={0.5}>
        {(emp.tasks || []).map((task, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #F8FAFC" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, background: task.done ? "#DCFCE7" : "#F1F5F9", color: task.done ? "#15803D" : "#94A3B8", border: task.done ? "none" : "2px solid #E4E8F0" }}>
              {task.done ? CHECK : ""}
            </div>
            <div style={{ fontSize: 13.5, color: task.done ? "#101828" : "#94A3B8" }}>{task.label}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

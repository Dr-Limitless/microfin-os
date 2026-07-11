import { useEffect, useState } from "react";
import { api } from "../api.js";
import { ACCENT } from "../theme.js";
import { CHECK } from "../glyphs.js";

const EMPTY_FORM = {
  fullName: "", email: "", phone: "", dob: "", address: "",
  department: "Human Resources", position: "", employmentType: "Full-time",
  startDate: "", manager: "",
};

const STEP_LABELS = ["Personal Info", "Job Details", "Review"];

const lbl = { fontSize: 12.5, fontWeight: 600, color: "#344054", marginBottom: 6, display: "block" };
const inp = { width: "100%", padding: "11px 13px", border: "1px solid #D0D5DD", borderRadius: 8, fontSize: 13.5, color: "#101828", background: "#fff" };

function Stepper({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {STEP_LABELS.map((label, i) => {
        const status = i < step ? "done" : i === step ? "active" : "upcoming";
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700, transition: "background .3s,color .3s", background: status === "upcoming" ? "#F1F5F9" : ACCENT, color: status === "upcoming" ? "#94A3B8" : "#fff" }}>
                {status === "done" ? CHECK : String(i + 1)}
              </div>
              <div style={{ fontSize: 11.5, fontWeight: status === "active" ? 700 : 500, color: status === "upcoming" ? "#94A3B8" : "#344054" }}>{label}</div>
            </div>
            {i < 2 && (
              <div style={{ flex: 1, height: 2, margin: "0 8px", marginBottom: 22, background: i < step ? ACCENT : "#E4E8F0", transition: "background .3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function HrmForm({ onDone, onAddAnother }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [reference, setReference] = useState({ departments: [], employmentTypes: [] });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.reference().then(setReference).catch(() => {});
  }, []);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const nextDisabled =
    step === 0 ? !(form.fullName && form.email)
    : step === 1 ? !(form.department && form.position)
    : false;

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const prev = () => (step === 0 ? onDone() : setStep((s) => s - 1));

  const submit = async () => {
    setError("");
    setSubmitting(true);
    try {
      await api.createEmployee(form);
      setSubmitted(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm({ ...EMPTY_FORM });
    setStep(0);
    setSubmitted(false);
    onAddAnother();
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", textAlign: "center" }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", animation: "popIn .5s ease both" }}>
          <div style={{ fontSize: 34, color: "#15803D", fontWeight: 700 }}>{CHECK}</div>
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#101828" }}>Onboarding started</div>
        <div style={{ fontSize: 14, color: "#64748B", marginTop: 10, lineHeight: 1.6 }}>
          {form.fullName} has been added to the system. HR will receive the onboarding checklist automatically.
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
          <button onClick={onDone} style={{ padding: "11px 20px", border: "1px solid #D0D5DD", borderRadius: 8, background: "#fff", fontSize: 13.5, fontWeight: 600, color: "#344054" }}>View employee records</button>
          <button onClick={reset} style={{ padding: "11px 20px", border: "none", borderRadius: 8, background: ACCENT, color: "#fff", fontSize: 13.5, fontWeight: 600 }}>Add another</button>
        </div>
      </div>
    );
  }

  const reviewRows = [
    ["Full name", form.fullName], ["Email", form.email], ["Phone", form.phone],
    ["Address", form.address], ["Department", form.department], ["Position", form.position],
    ["Employment type", form.employmentType], ["Start date", form.startDate],
  ];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#101828", marginBottom: 6 }}>New hire onboarding</div>
      <div style={{ fontSize: 13.5, color: "#64748B", marginBottom: 28 }}>Step {step + 1} of 3</div>

      <Stepper step={step} />

      <div style={{ background: "#fff", border: "1px solid #E4E8F0", borderRadius: 14, padding: 28, animation: "fadeInUp .3s ease both" }}>
        {step === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ gridColumn: "1/3" }}><label style={lbl}>Full name</label><input value={form.fullName} onChange={set("fullName")} placeholder="Juan Dela Cruz" style={inp} /></div>
            <div><label style={lbl}>Email</label><input value={form.email} onChange={set("email")} placeholder="juan@microfin.io" style={inp} /></div>
            <div><label style={lbl}>Phone</label><input value={form.phone} onChange={set("phone")} placeholder="+63 900 000 0000" style={inp} /></div>
            <div><label style={lbl}>Date of birth</label><input type="date" value={form.dob} onChange={set("dob")} style={inp} /></div>
            <div><label style={lbl}>Address</label><input value={form.address} onChange={set("address")} placeholder="City, Province" style={inp} /></div>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <label style={lbl}>Department</label>
              <select value={form.department} onChange={set("department")} style={inp}>
                {reference.departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Position</label><input value={form.position} onChange={set("position")} placeholder="Recruitment Specialist" style={inp} /></div>
            <div>
              <label style={lbl}>Employment type</label>
              <select value={form.employmentType} onChange={set("employmentType")} style={inp}>
                {reference.employmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Start date</label><input type="date" value={form.startDate} onChange={set("startDate")} style={inp} /></div>
            <div style={{ gridColumn: "1/3" }}><label style={lbl}>Manager</label><input value={form.manager} onChange={set("manager")} placeholder="Reporting manager" style={inp} /></div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14.5, color: "#101828", marginBottom: 14 }}>Review details</div>
            {reviewRows.map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F8FAFC", fontSize: 13.5 }}>
                <span style={{ color: "#64748B" }}>{label}</span>
                <span style={{ color: "#101828", fontWeight: 600 }}>{value || "—"}</span>
              </div>
            ))}
          </div>
        )}

        {error && <div style={{ fontSize: 12.5, color: "#DC2626", marginTop: 16 }}>{error}</div>}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26 }}>
          <button onClick={prev} style={{ padding: "11px 20px", border: "1px solid #D0D5DD", borderRadius: 8, background: "#fff", fontSize: 13.5, fontWeight: 600, color: "#344054" }}>Back</button>
          {step === 2 ? (
            <button onClick={submit} disabled={submitting} style={{ padding: "11px 22px", border: "none", borderRadius: 8, background: ACCENT, color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: submitting ? "wait" : "pointer" }}>
              {submitting ? "Submitting..." : "Submit & onboard"}
            </button>
          ) : (
            <button onClick={next} disabled={nextDisabled} style={{ padding: "11px 22px", border: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: "#fff", background: nextDisabled ? "#CBD5E1" : ACCENT, cursor: nextDisabled ? "not-allowed" : "pointer" }}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

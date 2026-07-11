import { useState } from "react";
import { ACCENT } from "../theme.js";
import { CARET } from "../glyphs.js";

const HRM_SECTIONS = ["hrm-list", "hrm-detail", "hrm-form"];

function NavRow({ item, section, hrmExpanded, onToggleHrm, onNavigate }) {
  const isActive = item.hasChildren
    ? HRM_SECTIONS.includes(section)
    : section === item.key;

  const rowStyle = {
    display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", margin: "2px 12px",
    borderRadius: 8, cursor: "pointer",
    color: isActive ? "#fff" : "rgba(255,255,255,.72)",
    background: isActive ? ACCENT : "transparent",
    fontWeight: isActive ? 600 : 500,
    transition: "background .15s,color .15s",
  };
  const monoStyle = {
    width: 28, height: 28, borderRadius: 8, flex: "none",
    background: isActive ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.08)",
    color: "#fff", fontSize: 10.5, fontWeight: 700, letterSpacing: ".02em",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
  const caretStyle = {
    fontSize: 10, color: "rgba(255,255,255,.5)",
    transform: hrmExpanded ? "rotate(0deg)" : "rotate(-90deg)",
    transition: "transform .15s",
  };

  return (
    <div>
      <div style={rowStyle} onClick={() => (item.hasChildren ? onToggleHrm() : onNavigate(item.key))}>
        <div style={monoStyle}>{item.mono}</div>
        <div style={{ flex: 1, fontSize: 13.5 }}>{item.label}</div>
        {item.hasChildren && <div style={caretStyle}>{CARET}</div>}
      </div>
      {item.hasChildren && hrmExpanded && (item.children || []).map((child) => (
        <div
          key={child.key}
          onClick={() => onNavigate(child.key)}
          style={{
            padding: "8px 16px 8px 56px", margin: "1px 12px", borderRadius: 8,
            fontSize: 13, cursor: "pointer",
            color: section === child.key ? "#fff" : "rgba(255,255,255,.58)",
            background: section === child.key ? "rgba(255,255,255,.1)" : "transparent",
          }}
        >
          {child.label}
        </div>
      ))}
    </div>
  );
}

export default function Sidebar({ modules, section, hrmExpanded, onToggleHrm, onNavigate, user, onLogout }) {
  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <div className="mf-scroll" style={{ width: 260, flex: "none", background: "#0B1F3A", display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "22px 20px 18px" }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 13, color: "#fff", flex: "none" }}>MF</div>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15.5, color: "#fff" }}>MicroFin OS</div>
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,.08)", margin: "4px 20px 12px" }} />

      <div style={{ flex: 1, paddingBottom: 16 }}>
        {modules.map((item) => (
          <NavRow
            key={item.key}
            item={item}
            section={section}
            hrmExpanded={hrmExpanded}
            onToggleHrm={onToggleHrm}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff" }}>{user.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>{user.role}</div>
        </div>
        <div
          onClick={onLogout}
          onMouseEnter={() => setLogoutHover(true)}
          onMouseLeave={() => setLogoutHover(false)}
          style={{ fontSize: 11, color: logoutHover ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.5)", cursor: "pointer", padding: "4px 8px", borderRadius: 6, background: logoutHover ? "rgba(255,255,255,.08)" : "transparent" }}
        >
          Log out
        </div>
      </div>
    </div>
  );
}

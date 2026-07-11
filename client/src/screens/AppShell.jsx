import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import Dashboard from "./Dashboard.jsx";
import HrmList from "./HrmList.jsx";
import HrmDetail from "./HrmDetail.jsx";
import HrmForm from "./HrmForm.jsx";
import Placeholder from "./Placeholder.jsx";
import { api } from "../api.js";
import { SECTION_TITLES } from "../theme.js";

export default function AppShell({ user, onLogout }) {
  const [modules, setModules] = useState([]);
  const [section, setSection] = useState("dashboard");
  const [hrmExpanded, setHrmExpanded] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    api.modules().then(setModules).catch(() => setModules([]));
  }, []);

  const navigate = (key) => {
    setSelectedEmployeeId(null);
    setSection(key);
  };

  const openEmployee = (id) => {
    setSelectedEmployeeId(id);
    setSection("hrm-detail");
  };

  const title = SECTION_TITLES[section] || "MicroFin OS";
  const isPlaceholder = !["dashboard", "hrm-list", "hrm-detail", "hrm-form"].includes(section);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden", background: "#F5F7FA" }}>
      <Sidebar
        modules={modules}
        section={section}
        hrmExpanded={hrmExpanded}
        onToggleHrm={() => setHrmExpanded((v) => !v)}
        onNavigate={navigate}
        user={user}
        onLogout={onLogout}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", minWidth: 0 }}>
        <Topbar title={title} />
        <div className="mf-scroll" style={{ flex: 1, overflowY: "auto", padding: 32 }} key={section}>
          {section === "dashboard" && <Dashboard />}
          {section === "hrm-list" && (
            <HrmList onOpen={openEmployee} onNewHire={() => navigate("hrm-form")} />
          )}
          {section === "hrm-detail" && (
            <HrmDetail employeeId={selectedEmployeeId} onBack={() => navigate("hrm-list")} />
          )}
          {section === "hrm-form" && (
            <HrmForm onDone={() => navigate("hrm-list")} onAddAnother={() => navigate("hrm-form")} />
          )}
          {isPlaceholder && <Placeholder title={title} />}
        </div>
      </div>
    </div>
  );
}

// Shared theme tokens. Accent is configurable, matching the original template.
export const ACCENT = "#2E6BE6";
export const ACCENT_OPTIONS = ["#2E6BE6", "#0E7C61", "#5B4FE9", "#B45309"];

export const STATUS_COLORS = {
  Active: { bg: "#DCFCE7", fg: "#15803D" },
  "On Leave": { bg: "#FEF3C7", fg: "#B45309" },
  Inactive: { bg: "#F1F5F9", fg: "#64748B" },
};

export const SECTION_TITLES = {
  dashboard: "Overview",
  "hrm-list": "Employee Records",
  "hrm-detail": "Employee Profile",
  "hrm-form": "New Hire Onboarding",
  finance: "Financial Management",
  supply: "Supply Chain & Inventory",
  fleet: "Fleet & Transportation",
  facilities: "Facilities & Administrative",
  client: "Client Services & Financial Transactions",
  oversight: "Institutional Oversight & Financial Control",
};

export const badgeStyle = (status) => {
  const c = STATUS_COLORS[status] || STATUS_COLORS.Inactive;
  return {
    fontSize: 11.5,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
    background: c.bg,
    color: c.fg,
  };
};

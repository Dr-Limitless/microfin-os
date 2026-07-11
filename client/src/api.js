// Thin fetch wrapper. Requests hit the Vite dev proxy (/api -> :4000).
const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.message) message = body.message;
    } catch (_) { /* ignore */ }
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  login: (email, password) =>
    request("/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  modules: () => request("/modules"),
  reference: () => request("/reference"),
  dashboard: () => request("/dashboard"),
  employees: () => request("/employees"),
  employee: (id) => request(`/employees/${id}`),
  createEmployee: (payload) =>
    request("/employees", { method: "POST", body: JSON.stringify(payload) }),
};

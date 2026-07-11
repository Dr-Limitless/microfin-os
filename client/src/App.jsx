import { useState } from "react";
import Login from "./screens/Login.jsx";
import AppShell from "./screens/AppShell.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }
  return <AppShell user={user} onLogout={() => setUser(null)} />;
}

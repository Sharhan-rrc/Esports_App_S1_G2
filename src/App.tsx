import { useState } from "react";
import { ChartNoAxesColumnIncreasing, House, Settings, UserRound } from "lucide-react";
import Dashboard from "./components/dashboard/Dashboard";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Admin from "./components/Administration/Admin";
import "./App.css";

type View = "dashboard" | "leaderboard" | "profile" | "admin";

/** UI navigation/demo-login state only. Shared external-resource data now lives
 * behind hooks, services and repositories instead of App props.
 */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [interestedGames, setInterestedGames] = useState<string[]>([]);
  const [view, setView] = useState<View>("dashboard");
  if (!isLoggedIn) return <Login onLogin={(selectedGames) => { setInterestedGames(selectedGames); setIsLoggedIn(true); setView("dashboard"); }} />;
  const sections = [
    { id: "dashboard" as const, label: "Dashboard", icon: <House aria-hidden="true" /> },
    { id: "leaderboard" as const, label: "Leaderboard", icon: <ChartNoAxesColumnIncreasing aria-hidden="true" /> },
    { id: "profile" as const, label: "Profile", icon: <UserRound aria-hidden="true" /> },
    { id: "admin" as const, label: "Admin", icon: <Settings aria-hidden="true" /> },
  ];
  return (
    <main className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand"><span className="app-brand__name">Esports App</span></div>
        <nav className="app-nav" aria-label="App sections">
          {sections.map((section) => (
            <button key={section.id} type="button" title={section.label}
              aria-label={"Open " + section.label.toLowerCase()}
              aria-current={view === section.id ? "page" : undefined}
              className={"app-nav__button" + (view === section.id ? " app-nav__button--active" : "")}
              onClick={() => setView(section.id)}>
              {section.icon}<span>{section.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <section className="app-content">
        {view === "dashboard" && <Dashboard interestedGames={interestedGames} />}
        {view === "leaderboard" && <Leaderboard />}
        {view === "profile" && <Profile />}
        {view === "admin" && <Admin />}
      </section>
    </main>
  );
}

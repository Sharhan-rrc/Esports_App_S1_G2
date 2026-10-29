import { useState } from "react";
import LeaderboardScoreForm from "./LeaderboardScoreForm";
import LeaderboardTables from "./LeaderboardTables";
import type { LeaderboardEntry } from "../../types/leaderboard.ts";
import "./Leaderboard.css";

/**
 * Composes two independent consumers of useLeaderboard. This page only coordinates
 * which entry is being edited and announces completed actions. Both children reach
 * the shared resource through hook -> service -> repository, rather than prop-drilled data.
 */
export default function Leaderboard() {
  const [editingEntry, setEditingEntry] = useState<LeaderboardEntry | null>(null);
  const [notice, setNotice] = useState("");

  function startEditing(entry: LeaderboardEntry) {
    setNotice("");
    setEditingEntry(entry);
  }

  return (
    <section className="leaderboard">
      <header className="leaderboard__header">
        <h1 className="leaderboard__title">Game Leaderboards</h1>
        <p className="leaderboard__description">
          View the top players and their highest scores across every game.
        </p>
      </header>
      <p className="leaderboard__notice" role="status" aria-live="polite">{notice}</p>
      <LeaderboardScoreForm
        key={editingEntry?.id ?? "new-score"}
        editingEntry={editingEntry}
        onCancel={() => setEditingEntry(null)}
        onSaved={(message) => { setEditingEntry(null); setNotice(message); }}
      />
      <LeaderboardTables
        onEdit={startEditing}
        onDeleted={(id) => {
          if (editingEntry?.id === id) setEditingEntry(null);
          setNotice("Score deleted. Rankings have been updated.");
        }}
      />
    </section>
  );
}

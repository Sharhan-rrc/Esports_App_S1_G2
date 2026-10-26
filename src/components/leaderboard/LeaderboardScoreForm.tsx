import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus } from "lucide-react";
import { useLeaderboard } from "../../hooks/useLeaderboard.ts";
import type { LeaderboardEntry, LeaderboardInput } from "../../types/leaderboard.ts";

interface Props {
  editingEntry: LeaderboardEntry | null;
  onCancel: () => void;
  onSaved: (message: string) => void;
}

/**
 * Uses the custom hook for service-backed add/update actions and error feedback.
 * Raw form values stay in the presentation layer; score validation is delegated to
 * leaderboardService and storage to leaderboardRepository. The page keys this form
 * by entry ID to reset its draft when an edit is selected or cancelled.
 */
export default function LeaderboardScoreForm({ editingEntry, onCancel, onSaved }: Props) {
  const { games, addScore, updateScore, error, clearError } = useLeaderboard();
  const [form, setForm] = useState<LeaderboardInput>({
    game: editingEntry?.game ?? games[0] ?? "",
    name: editingEntry?.name ?? "",
    score: editingEntry ? String(editingEntry.score) : "",
  });
  const errorId = useId();
  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingEntry) nameInput.current?.focus();
  }, [editingEntry]);

  function change(field: keyof LeaderboardInput, value: string) {
    clearError();
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const saved = editingEntry ? updateScore(editingEntry.id, form) : addScore(form);
    if (saved) {
      setForm((current) => ({ ...current, name: "", score: "" }));
      onSaved(editingEntry ? "Score updated. Rankings have been recalculated." : "Score added. Rankings have been updated.");
    }
  }

  return (
    <form className="leaderboard__add-score" onSubmit={submit} noValidate aria-describedby={error ? errorId : undefined}>
      <div className="leaderboard__form-heading">
        <span className="leaderboard__form-icon" aria-hidden="true">
          {editingEntry ? <Pencil size={20} /> : <Plus size={20} />}
        </span>
        <div>
          <h2>{editingEntry ? "Edit score" : "Add score"}</h2>
          <p>{editingEntry ? "Update this player's game, name or highest score." : "Add a player to the selected game leaderboard."}</p>
        </div>
      </div>
      <div className="leaderboard__form-fields">
        <label>Select game
          <select value={form.game} onChange={(event) => change("game", event.target.value)} required>
            {games.map((game) => <option key={game} value={game}>{game}</option>)}
          </select>
        </label>
        <label>Player name
          <input ref={nameInput} type="text" value={form.name}
            onChange={(event) => change("name", event.target.value)}
            placeholder="Enter player name" maxLength={40} required />
        </label>
        <label>Score
          <input type="number" value={form.score} onChange={(event) => change("score", event.target.value)}
            placeholder="0" min="0" step="1" required />
        </label>
        <div className="leaderboard__actions">
          <button type="submit">{editingEntry ? "Save changes" : "Add score"}</button>
          {editingEntry && <button type="button" className="leaderboard__secondary" onClick={onCancel}>Cancel edit</button>}
        </div>
      </div>
      {error && <p className="leaderboard__error" id={errorId} role="alert">{error}</p>}
    </form>
  );
}


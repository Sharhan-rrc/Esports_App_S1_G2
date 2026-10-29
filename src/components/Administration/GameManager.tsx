import { useState } from "react";
import { useGames } from "../../hooks/useGames.ts";
import { useActionFeedback } from "../../hooks/useActionFeedback.ts";
import { administrationService } from "../../services/administrationService.ts";
import "../shared/Sprint3.css";

/** Shared Admin presentation. Reads catalogue via hook/service/repository;
 * creation/deletion rules stay in the administration and game services.
 */
export default function GameManager() {
  const games = useGames();
  const { error, notice, run, clear } = useActionFeedback();
  const [form, setForm] = useState({ name: "", genre: "", topPlayer: "" });
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  return (
    <section className="sprint3-panel">
      <h2>Manage Games</h2>
      <form className="sprint3-form" noValidate onSubmit={(event) => {
        event.preventDefault();
        if (run(() => { administrationService.addGame(form); }, "Game added to all game selectors.")) {
          setForm({ name: "", genre: "", topPlayer: "" });
        }
      }}>
        <label>Game name<input value={form.name} maxLength={60} required
          onChange={(event) => { clear(); setForm({ ...form, name: event.target.value }); }} /></label>
        <label>Genre<input value={form.genre} required
          onChange={(event) => { clear(); setForm({ ...form, genre: event.target.value }); }} /></label>
        <label>Top player<input value={form.topPlayer} required
          onChange={(event) => { clear(); setForm({ ...form, topPlayer: event.target.value }); }} /></label>
        <button type="submit">Add game</button>
      </form>
      {error && <p role="alert">{error}</p>}
      <p role="status">{notice}</p>
      <ul className="sprint3-list">
        {games.map((game) => (
          <li key={game.id}>
            <strong>{game.name}</strong><p>{game.genre} · {game.topPlayer}</p>
            <div className="sprint3-actions">
              {confirmingId === game.id ? (
                <>
                  <span>Delete this game?</span>
                  <button type="button" aria-label={"Confirm delete game " + game.name} onClick={() => {
                    if (run(() => administrationService.removeGame(game.id), "Game deleted.")) setConfirmingId(null);
                  }}>Confirm delete</button>
                  <button type="button" onClick={() => { setConfirmingId(null); clear(); }}>Cancel</button>
                </>
              ) : <button type="button" aria-label={"Delete game " + game.name}
                onClick={() => { clear(); setConfirmingId(game.id); }}>Delete</button>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

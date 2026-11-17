import { useRef, useState } from "react";
import { useStreams } from "../../hooks/useStreams.ts";
import { streamPlatforms } from "../../types/stream.ts";
import type { Stream, StreamInput } from "../../types/stream.ts";
import "../shared/Sprint3.css";
/** Second useStreams consumer. Owns draft/edit/confirmation UI, while all stream
* CRUD travels through the hook, service and repository. Also reused by Admin.
*/
export default function StreamManager() {
  const { streams, games, add, update, remove, error, notice, clear } = useStreams();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const [form, setForm] = useState<StreamInput>({ title: "", gameId: "", platform: "YouTube" });
  const titleInput = useRef<HTMLInputElement>(null);
  const gameId = games.some((game) => String(game.id) === form.gameId) ? form.gameId : String(games[0]?.id ?? "");
  function reset() { setEditingId(null); setForm({ title: "", gameId, platform: "YouTube" }); }
  function edit(stream: Stream) {
    clear();
    setEditingId(stream.id);
    setForm({ title: stream.title, gameId: String(stream.gameId), platform: stream.platform });
    titleInput.current?.focus();
  }
  return (
    <section className="sprint3-panel">
      <h2>Manage Streams</h2>
      <form className="sprint3-form" noValidate onSubmit={(event) => {
        event.preventDefault();
        const draft = { ...form, gameId };
        if (editingId === null ? add(draft) : update(editingId, draft)) reset();
      }}>
        <label>Stream title
          <input ref={titleInput} value={form.title} maxLength={100} required
            onChange={(event) => { clear(); setForm({ ...form, title: event.target.value }); }} />
        </label>
        <label>Stream game
          <select value={gameId} onChange={(event) => { clear(); setForm({ ...form, gameId: event.target.value }); }}>
            {!games.length && <option value="">No games available</option>}
            {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
          </select>
        </label>
        <label>Platform
          <select value={form.platform} onChange={(event) => { clear(); setForm({ ...form, platform: event.target.value }); }}>
            {streamPlatforms.map((platform) => <option key={platform}>{platform}</option>)}
          </select>
        </label>
        <button type="submit" disabled={!games.length}>{editingId === null ? "Add stream" : "Save stream"}</button>
        {editingId !== null && <button type="button" onClick={() => { reset(); clear(); }}>Cancel stream edit</button>}
      </form>
      {error && <p role="alert">{error}</p>}
      <p role="status">{notice}</p>
      <ul className="sprint3-list">
        {streams.map((stream) => (
          <li key={stream.id}>
            <strong>{stream.title}</strong>
            <p>{games.find((game) => game.id === stream.gameId)?.name} · {stream.platform}</p>
            <div className="sprint3-actions">
              {confirmingId === stream.id ? (
                <>
                  <span>Delete this stream?</span>
                  <button type="button" onClick={() => {
                    if (remove(stream.id)) {
                      setConfirmingId(null);
                      if (editingId === stream.id) reset();
                    }
                  }} aria-label={"Confirm delete stream " + stream.title}>Confirm delete</button>
                  <button type="button" onClick={() => setConfirmingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => edit(stream)} aria-label={"Edit stream " + stream.title}>Edit</button>
                  <button type="button" onClick={() => { clear(); setConfirmingId(stream.id); }}
                    aria-label={"Delete stream " + stream.title}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      {!streams.length && <p>No streams yet. Add the first stream above.</p>}
    </section>
  );
}

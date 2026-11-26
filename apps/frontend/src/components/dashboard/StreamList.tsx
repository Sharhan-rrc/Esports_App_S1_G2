import { useStreams } from "../../hooks/useStreams.ts";
import "../shared/Sprint3.css";
export default function StreamList() {
  const { visibleStreams, games, selectedGame, setSelectedGame, loading, loadError: error, retry } = useStreams();
  return (
    <section className="sprint3-panel">
      {loading && <p role="status">Loading saved streams…</p>}
      {error && <p role="alert">{error} <button onClick={retry}>Retry</button></p>}
      <h2>Live Streams</h2>
      <label className="sprint3-filter">Filter streams by game
        <select value={selectedGame} onChange={(event) => setSelectedGame(event.target.value)}>
          <option value="">All games</option>
          {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
        </select>
      </label>
      {!loading && !error && !visibleStreams.length ? <p>No streams are available for this game.</p> : (
        <ul className="sprint3-list">
          {visibleStreams.map((stream) => (
            <li key={stream.id}>
              <h3>{stream.title}</h3>
              <p>{games.find((game) => game.id === stream.gameId)?.name ?? "Unavailable game"} · {stream.platform}</p>
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}

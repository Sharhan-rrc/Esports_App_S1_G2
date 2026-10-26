import { useState } from "react";
import { useLeaderboard } from "../../hooks/useLeaderboard.ts";
import type { LeaderboardEntry } from "../../types/leaderboard.ts";
import GameIcon from "./GameIcon";

interface Props {
  onEdit: (entry: LeaderboardEntry) => void;
  onDeleted: (id: number) => void;
}

/**
 * Second useLeaderboard consumer: service-computed rankings, search and game filters
 * reach this view without importing data or a repository. Form CRUD changes publish
 * one new snapshot, so these tables update immediately. The service ranks before
 * searching; this component only renders positions and handles confirmation UI.
 */
export default function LeaderboardTables({ onEdit, onDeleted }: Props) {
  const {
    entries, games, gameLeaderboards, search, setSearch,
    selectedGame, setSelectedGame, deleteScore, error, clearError,
  } = useLeaderboard();
  const [confirmingId, setConfirmingId] = useState<number | null>(null);
  const resultCount = gameLeaderboards.reduce((count, game) => count + game.players.length, 0);

  function remove(id: number) {
    if (deleteScore(id)) {
      setConfirmingId(null);
      onDeleted(id);
    }
  }

  return (
    <section aria-label="Leaderboard results">
      <div className="leaderboard__filters">
        <label>Search players
          <input type="search" placeholder="Search by player name" value={search}
            onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label>Filter by game
          <select value={selectedGame} onChange={(event) => setSelectedGame(event.target.value)}>
            <option value="">All games</option>
            {games.map((game) => <option key={game} value={game}>{game}</option>)}
          </select>
        </label>
        <button type="button" className="leaderboard__secondary"
          disabled={!search && !selectedGame}
          onClick={() => { setSearch(""); setSelectedGame(""); }}>Clear filters</button>
      </div>
      <p className="leaderboard__results" role="status">
        Showing {resultCount} of {entries.length} scores. Equal scores share a rank (1, 1, 3).
      </p>
      {error && <p className="leaderboard__error" role="alert">{error}</p>}
      <div className="leaderboard__games">
        {gameLeaderboards.map((game) => (
          <article className="leaderboard__game" key={game.name}>
            <div className="leaderboard__title-row">
              <span className="leaderboard__logo" aria-hidden="true"><GameIcon game={game.name} /></span>
              <h2 className="leaderboard__game-title">{game.name}</h2>
            </div>
            {game.players.length === 0 ? (
              <p className="leaderboard__empty">
                {search.trim() ? "No players match your search in this game." : "No scores yet. Add the first player above."}
              </p>
            ) : (
              <div className="leaderboard__table-wrap">
                <table className="leaderboard__table" aria-label={game.name + " leaderboard"}>
                  <thead><tr><th scope="col">Position</th><th scope="col">Player</th>
                    <th scope="col">Highest Score</th><th scope="col">Actions</th></tr></thead>
                  <tbody>{game.players.map((player) => (
                    <tr key={player.id}>
                      <td><span className={player.position === 1 ? "leaderboard__first" : undefined}>{player.position}</span></td>
                      <td>{player.name}</td>
                      <td>{player.score.toLocaleString()}</td>
                      <td>
                        <div className="leaderboard__row-actions">
                          {confirmingId === player.id ? (
                            <>
                              <span>Delete {player.name}?</span>
                              <button type="button" onClick={() => remove(player.id)}
                                aria-label={"Confirm delete " + player.name + " in " + game.name}>Confirm delete</button>
                              <button type="button" onClick={() => { setConfirmingId(null); clearError(); }}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button type="button" onClick={() => onEdit(player)}
                                aria-label={"Edit " + player.name + " in " + game.name}>Edit</button>
                              <button type="button" onClick={() => { setConfirmingId(player.id); clearError(); }}
                                aria-label={"Delete " + player.name + " in " + game.name}>Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}


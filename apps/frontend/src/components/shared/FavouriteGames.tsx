import { useState } from "react";
import { useFavourites } from "../../hooks/useFavourites.ts";
import "./Sprint3.css";

/** Shared presentation used by Dashboard, Profile and Admin. The hook delegates
 * rules to a service and storage to a repository; App no longer passes favourites.
 */
export default function FavouriteGames({ allowAdd = false }: { allowAdd?: boolean }) {
  const { games, favourites, add, remove, error, notice } = useFavourites();
  const [selectedId, setSelectedId] = useState("");
  const selected = games.some((game) => String(game.id) === selectedId)
    ? selectedId : String(games[0]?.id ?? "");
  return (
    <section className="sprint3-panel">
      <h2>Favourite Games</h2>
      {allowAdd && (
        <form className="sprint3-form" onSubmit={(event) => {
          event.preventDefault(); add(Number(selected));
        }}>
          <label>Choose a favourite game
            <select value={selected} onChange={(event) => setSelectedId(event.target.value)}>
              {!games.length && <option value="">No games available</option>}
              {games.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}
            </select>
          </label>
          <button type="submit" disabled={!games.length}>Add favourite</button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
      <p role="status">{notice}</p>
      {!favourites.length ? <p>No favourite games yet. Add one from Dashboard.</p> : (
        <ul className="sprint3-list">
          {favourites.map((game) => (
            <li key={game.id}>
              <span>{game.name}</span>
              <button type="button" onClick={() => remove(game.id)}
                aria-label={"Remove favourite " + game.name}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

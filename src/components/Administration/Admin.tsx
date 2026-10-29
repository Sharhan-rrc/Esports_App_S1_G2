import StreamManager from "../dashboard/StreamManager";
import FavouriteGames from "../shared/FavouriteGames";
import GameManager from "./GameManager";
import "./Admin.css";

/** Small shared frontend demo screen; reuses the individual stream implementation.
 * This is not authentication or secure authorization and adds no backend.
 */
export default function Admin() {
  return (
    <section className="admin">
      <header className="admin__header">
        <h1 className="admin__title">Administration</h1>
        <p className="admin__subtitle">Manage shared games, live streams and favourites.</p>
      </header>
      <GameManager />
      <StreamManager />
      <FavouriteGames allowAdd />
    </section>
  );
}

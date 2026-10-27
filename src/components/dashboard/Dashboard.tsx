import "./Dashboard.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target } from "lucide-react";
import { useGames } from "../../hooks/useGames.ts";
import FavouriteGames from "../shared/FavouriteGames";
import StreamList from "./StreamList";
import StreamManager from "./StreamManager";

interface DashboardProps {
  interestedGames?: string[];
  favouriteGames?: string[];
  onAddFavourite?: (game: string) => void;
}

// Simple icon "logo" badge per game, in place of a real Esports World Cup logo
function GameIcon({ name }: { name: string }) {
  switch (name) {
    case "Valorant":
      return <Target size={22} />;
    case "League of Legends":
      return <Swords size={22} />;
    case "CS:GO":
      return <Crosshair size={22} />;
    case "Dota 2":
      return <Gamepad2 size={22} />;
    case "Fortnite":
      return <Rocket size={22} />;
    default:
      return <Gamepad2 size={22} />;
  }
}

/** Keeps presentation in the page while stream consumers share one resource. */
export default function Dashboard({ interestedGames = [] }: DashboardProps = {}) {
  const games = useGames();
  const featuredGames = interestedGames.length
    ? games.filter((game) => interestedGames.includes(game.name))
    : games;
  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Esports Hub Dashboard</h1>
        <p className="dashboard__subtitle">
          Explore top games, players, and live esports streams.
        </p>
      </header>

      <StreamList />

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">
          {interestedGames.length ? "Games You Follow" : "Featured Games"}
        </h2>
        <div className="dashboard__games-grid">
          {featuredGames.map((game) => (
            <article key={game.id} className="dashboard__game-card">
              <span className="dashboard__game-logo" aria-hidden="true">
                <GameIcon name={game.name} />
              </span>
              <h3 className="dashboard__game-name">{game.name}</h3>
              <p>Genre: {game.genre}</p>
              <p className="dashboard__game-top-player">
                Top Player: <span>{game.topPlayer}</span>
              </p>
            </article>
          ))}
        </div>
        {!featuredGames.length && <p>No featured games match your interests.</p>}
      </section>

      <FavouriteGames allowAdd />
      <details className="sprint3-panel">
        <summary>Manage demo streams</summary>
        <StreamManager />
      </details>
    </section>
  );
}

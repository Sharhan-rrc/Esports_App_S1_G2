import React, { useState } from "react";
import "./Dashboard.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target } from "lucide-react";

interface GameCard {
  id: number;
  name: string;
  genre: string;
  topPlayer: string;
}

interface LiveStream {
  id: number;
  title: string;
  game: string;
  platform: string;
}

interface DashboardProps {
  interestedGames: string[];
  favouriteGames: string[];
  onAddFavourite: (game: string) => void;
}

const ALL_GAMES: GameCard[] = [
  { id: 1, name: "Valorant", genre: "FPS", topPlayer: "AceHunter" },
  { id: 2, name: "League of Legends", genre: "MOBA", topPlayer: "ShadowFox" },
  { id: 3, name: "CS:GO", genre: "FPS", topPlayer: "NeonBlade" },
  { id: 4, name: "Dota 2", genre: "MOBA", topPlayer: "MysticBlade" },
  { id: 5, name: "Fortnite", genre: "Battle Royale", topPlayer: "PixelStorm" },
];

const liveStreams: LiveStream[] = [
  {
    id: 1,
    title: "Valorant Finals",
    game: "Valorant",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "LoL Championship",
    game: "League of Legends",
    platform: "Twitch",
  },
  {
    id: 3,
    title: "CS:GO Major",
    game: "CS:GO",
    platform: "YouTube",
  },
];

function getGameIcon(name: string) {
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

const Dashboard: React.FC<DashboardProps> = ({
  interestedGames,
  favouriteGames,
  onAddFavourite,
}) => {
  const featuredGames =
    interestedGames.length > 0
      ? ALL_GAMES.filter((game) => interestedGames.includes(game.name))
      : ALL_GAMES;

  const [selectedGame, setSelectedGame] = useState<string>(
    ALL_GAMES[0].name
  );

  const handleAddFavourite = (event: React.FormEvent) => {
    event.preventDefault();
    onAddFavourite(selectedGame);
  };

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">
          Esports Hub Dashboard
        </h1>

        <p className="dashboard__subtitle">
          Explore top games, players, and live esports streams.
        </p>
      </header>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">
          {interestedGames.length > 0
            ? "Games You Follow"
            : "Featured Games"}
        </h2>

        <div className="dashboard__games-grid">
          {featuredGames.map((game) => (
            <article
              key={game.id}
              className="dashboard__game-card"
            >
              <div className="dashboard__game-logo">
                {getGameIcon(game.name)}
              </div>

              <h3 className="dashboard__game-name">
                {game.name}
              </h3>

              <p className="dashboard__game-genre">
                Genre: {game.genre}
              </p>

              <p className="dashboard__game-top-player">
                Top Player: <span>{game.topPlayer}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">
          Add a Favourite Game
        </h2>

        <form
          className="dashboard__favourite-form"
          onSubmit={handleAddFavourite}
        >
          <label className="dashboard__favourite-label">
            Choose a game

            <select
              className="dashboard__favourite-select"
              value={selectedGame}
              onChange={(event) =>
                setSelectedGame(event.target.value)
              }
            >
              {ALL_GAMES.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="dashboard__favourite-button"
          >
            Add to Favourites
          </button>
        </form>

        {favouriteGames.length > 0 ? (
          <ul className="dashboard__favourites-list">
            {favouriteGames.map((game) => (
              <li
                key={game}
                className="dashboard__favourite-item"
              >
                <span className="dashboard__favourite-icon">
                  {getGameIcon(game)}
                </span>

                {game}
              </li>
            ))}
          </ul>
        ) : (
          <p className="dashboard__favourites-empty">
            You haven't added any favourite games yet.
          </p>
        )}
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">
          Live Streams
        </h2>

        <ul className="dashboard__streams-list">
          {liveStreams.map((stream) => (
            <li
              key={stream.id}
              className="dashboard__stream-item"
            >
              <h3 className="dashboard__stream-title">
                {stream.title}
              </h3>

              <p className="dashboard__stream-detail">
                Game: <span>{stream.game}</span> · Platform:{" "}
                <span>{stream.platform}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Dashboard;
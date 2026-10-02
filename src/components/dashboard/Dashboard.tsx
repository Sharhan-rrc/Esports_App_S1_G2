import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target } from "lucide-react";
import type { GameCard, LiveStream } from "../../types";

interface DashboardProps {
  games: GameCard[];
  liveStreams: LiveStream[];
  interestedGames: string[];
  favouriteGames: string[];
  onAddFavourite: (game: string) => void;
}

// Simple icon "logo" badge per game, in place of a real Esports World Cup logo
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
  games,
  liveStreams,
  interestedGames,
  favouriteGames,
  onAddFavourite,
}) => {
  // Uses shared state from Login: if the user picked games there, show those.
  // Otherwise show the current game list managed by Administration.
  const featuredGames =
    interestedGames.length > 0
      ? games.filter((game) => interestedGames.includes(game.name))
      : games;

  const [selectedGame, setSelectedGame] = useState<string>(games[0]?.name ?? "");
  const [favouriteGame, setFavouriteGame] = useState<string>(games[0]?.name ?? "");

  useEffect(() => {
    if (games.length === 0) {
      setSelectedGame("");
      setFavouriteGame("");
      return;
    }

    if (!games.some((game) => game.name === selectedGame)) {
      setSelectedGame(games[0].name);
    }
    if (!games.some((game) => game.name === favouriteGame)) {
      setFavouriteGame(games[0].name);
    }
  }, [games, selectedGame, favouriteGame]);

  const selectedStreams = liveStreams.filter((stream) => stream.game === selectedGame);

  const handleAddFavourite = (event: React.FormEvent) => {
    event.preventDefault();
    onAddFavourite(favouriteGame);
  };

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Esports Hub Dashboard</h1>
        <p className="dashboard__subtitle">
          Explore top games, players, and live esports streams.
        </p>
      </header>

      <section className="dashboard__section dashboard__section--streams">
        <h2 className="dashboard__section-title">Live Streams: {selectedGame}</h2>
        <label className="dashboard__stream-select-label">
          Select a game
          <select
            className="dashboard__stream-select"
            value={selectedGame}
            onChange={(event) => setSelectedGame(event.target.value)}
          >
            {games.map((game) => (
              <option key={game.id} value={game.name}>
                {game.name}
              </option>
            ))}
          </select>
        </label>
        <ul className="dashboard__streams-list">
          {selectedStreams.length > 0 ? (
            selectedStreams.map((stream) => (
              <li key={stream.id} className="dashboard__stream-item">
                <h3 className="dashboard__stream-title">{stream.title}</h3>
                <p className="dashboard__stream-detail">
                  Game: <span>{stream.game}</span> · Platform: <span>{stream.platform}</span>
                </p>
              </li>
            ))
          ) : (
            <li className="dashboard__stream-item">
              No live streams are available for {selectedGame} right now.
            </li>
          )}
        </ul>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">
          {interestedGames.length > 0 ? "Games You Follow" : "Featured Games"}
        </h2>
        <div className="dashboard__games-grid">
          {featuredGames.map((game) => (
            <article key={game.id} className="dashboard__game-card">
              <div className="dashboard__game-logo">{getGameIcon(game.name)}</div>
              <h3 className="dashboard__game-name">{game.name}</h3>
              <p className="dashboard__game-genre">Genre: {game.genre}</p>
              <p className="dashboard__game-top-player">
                Top Player: <span>{game.topPlayer}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Add a Favourite Game</h2>
        <form className="dashboard__favourite-form" onSubmit={handleAddFavourite}>
          <label className="dashboard__stream-select-label">
            Choose a game
            <select
              className="dashboard__favourite-select"
              value={favouriteGame}
              onChange={(event) => setFavouriteGame(event.target.value)}
            >
              {games.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="dashboard__favourite-button">
            Add {favouriteGame} to Favourites
          </button>
        </form>

        {favouriteGames.length > 0 ? (
          <ul className="dashboard__favourites-list">
            {favouriteGames.map((game) => (
              <li key={game} className="dashboard__favourite-item">
                <span className="dashboard__favourite-icon">{getGameIcon(game)}</span>
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

    </section>
  );
};

export default Dashboard;

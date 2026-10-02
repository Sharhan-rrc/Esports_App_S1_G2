import React, { useEffect, useState } from "react";
import "./Admin.css";
import { Crosshair, Gamepad2, Radio, Rocket, Swords, Target, X } from "lucide-react";
import type { GameCard, LiveStream } from "../../types";

interface AdminProps {
  games: GameCard[];
  liveStreams: LiveStream[];
  favouriteGames: string[];
  onAddGame: (game: Omit<GameCard, "id">) => void;
  onRemoveGame: (id: number) => void;
  onAddLiveStream: (stream: Omit<LiveStream, "id">) => void;
  onRemoveLiveStream: (id: number) => void;
  onAddFavourite: (game: string) => void;
  onRemoveFavourite: (game: string) => void;
}

function getGameIcon(name: string) {
  switch (name) {
    case "Valorant":
      return <Target size={18} />;
    case "League of Legends":
      return <Swords size={18} />;
    case "CS:GO":
      return <Crosshair size={18} />;
    case "Dota 2":
      return <Gamepad2 size={18} />;
    case "Fortnite":
      return <Rocket size={18} />;
    default:
      return <Gamepad2 size={18} />;
  }
}

const Admin: React.FC<AdminProps> = ({
  games,
  liveStreams,
  favouriteGames,
  onAddGame,
  onRemoveGame,
  onAddLiveStream,
  onRemoveLiveStream,
  onAddFavourite,
  onRemoveFavourite,
}) => {
  const [gameForm, setGameForm] = useState({ name: "", genre: "", topPlayer: "" });
  const [streamForm, setStreamForm] = useState({
    title: "",
    game: games[0]?.name ?? "",
    platform: "YouTube",
  });
  const [favouriteSelection, setFavouriteSelection] = useState(games[0]?.name ?? "");

  // Keep the stream/favourite selects valid as the game list changes
  useEffect(() => {
    if (games.length > 0 && !games.some((game) => game.name === streamForm.game)) {
      setStreamForm((prev) => ({ ...prev, game: games[0].name }));
    }
    if (games.length > 0 && !games.some((game) => game.name === favouriteSelection)) {
      setFavouriteSelection(games[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  const handleAddGame = (event: React.FormEvent) => {
    event.preventDefault();
    if (!gameForm.name.trim()) return;
    onAddGame({
      name: gameForm.name.trim(),
      genre: gameForm.genre.trim() || "Unknown",
      topPlayer: gameForm.topPlayer.trim() || "TBD",
    });
    setGameForm({ name: "", genre: "", topPlayer: "" });
  };

  const handleAddStream = (event: React.FormEvent) => {
    event.preventDefault();
    if (!streamForm.title.trim() || !streamForm.game) return;
    onAddLiveStream({
      title: streamForm.title.trim(),
      game: streamForm.game,
      platform: streamForm.platform.trim() || "YouTube",
    });
    setStreamForm((prev) => ({ ...prev, title: "" }));
  };

  const handleAddFavourite = (event: React.FormEvent) => {
    event.preventDefault();
    if (!favouriteSelection) return;
    onAddFavourite(favouriteSelection);
  };

  return (
    <section className="admin">
      <header className="admin__header">
        <h1 className="admin__title">Administration</h1>
        <p className="admin__subtitle">
          Manage the games, live streams, and favourite games shown on the Dashboard.
        </p>
      </header>

      <section className="admin__section">
        <h2 className="admin__section-title">Add Game</h2>
        <form className="admin__form" onSubmit={handleAddGame}>
          <label className="admin__form-label">
            Game Name
            <input
              type="text"
              className="admin__form-input"
              placeholder="e.g. Apex Legends"
              value={gameForm.name}
              onChange={(event) => setGameForm({ ...gameForm, name: event.target.value })}
            />
          </label>
          <label className="admin__form-label">
            Genre
            <input
              type="text"
              className="admin__form-input"
              placeholder="e.g. Battle Royale"
              value={gameForm.genre}
              onChange={(event) => setGameForm({ ...gameForm, genre: event.target.value })}
            />
          </label>
          <label className="admin__form-label">
            Top Player
            <input
              type="text"
              className="admin__form-input"
              placeholder="e.g. AceHunter"
              value={gameForm.topPlayer}
              onChange={(event) => setGameForm({ ...gameForm, topPlayer: event.target.value })}
            />
          </label>
          <button type="submit" className="admin__form-button">
            Add Game
          </button>
        </form>

        {games.length > 0 ? (
          <ul className="admin__games-list">
            {games.map((game) => (
              <li key={game.id} className="admin__game-item">
                <span className="admin__game-icon">{getGameIcon(game.name)}</span>
                <span className="admin__game-name">{game.name}</span>
                <span className="admin__game-meta">{game.genre}</span>
                <button
                  type="button"
                  className="admin__remove-button"
                  onClick={() => onRemoveGame(game.id)}
                  aria-label={`Remove ${game.name}`}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="admin__empty">No games yet. Add one above.</p>
        )}
      </section>

      <section className="admin__section">
        <h2 className="admin__section-title">Add Live Stream</h2>
        <form className="admin__form" onSubmit={handleAddStream}>
          <label className="admin__form-label">
            Stream Title
            <input
              type="text"
              className="admin__form-input"
              placeholder="e.g. Apex Invitational"
              value={streamForm.title}
              onChange={(event) => setStreamForm({ ...streamForm, title: event.target.value })}
            />
          </label>
          <label className="admin__form-label">
            Game
            <select
              className="admin__form-select"
              value={streamForm.game}
              onChange={(event) => setStreamForm({ ...streamForm, game: event.target.value })}
            >
              {games.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>
          <label className="admin__form-label">
            Platform
            <input
              type="text"
              className="admin__form-input"
              placeholder="e.g. YouTube"
              value={streamForm.platform}
              onChange={(event) => setStreamForm({ ...streamForm, platform: event.target.value })}
            />
          </label>
          <button type="submit" className="admin__form-button">
            Add Stream
          </button>
        </form>

        {liveStreams.length > 0 ? (
          <ul className="admin__streams-list">
            {liveStreams.map((stream) => (
              <li key={stream.id} className="admin__stream-item">
                <Radio size={16} className="admin__stream-icon" aria-hidden="true" />
                <div className="admin__stream-info">
                  <p className="admin__stream-title">{stream.title}</p>
                  <p className="admin__stream-detail">
                    {stream.game} · {stream.platform}
                  </p>
                </div>
                <button
                  type="button"
                  className="admin__remove-button"
                  onClick={() => onRemoveLiveStream(stream.id)}
                  aria-label={`Remove ${stream.title}`}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="admin__empty">No live streams yet. Add one above.</p>
        )}
      </section>

      <section className="admin__section">
        <h2 className="admin__section-title">Favourite Games</h2>
        <form className="admin__form" onSubmit={handleAddFavourite}>
          <label className="admin__form-label">
            Choose a game
            <select
              className="admin__form-select"
              value={favouriteSelection}
              onChange={(event) => setFavouriteSelection(event.target.value)}
            >
              {games.map((game) => (
                <option key={game.id} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="admin__form-button">
            Add to Favourites
          </button>
        </form>

        {favouriteGames.length > 0 ? (
          <ul className="admin__favourites-list">
            {favouriteGames.map((game) => (
              <li key={game} className="admin__favourite-item">
                <span className="admin__favourite-icon">{getGameIcon(game)}</span>
                {game}
                <button
                  type="button"
                  className="admin__remove-button"
                  onClick={() => onRemoveFavourite(game)}
                  aria-label={`Remove ${game} from favourites`}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="admin__empty">No favourite games added yet.</p>
        )}
      </section>
    </section>
  );
};

export default Admin;

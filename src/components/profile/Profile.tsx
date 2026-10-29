import React, { useState } from "react";
import "./Profile.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target, X } from "lucide-react";

import { parseSavedGames, summarizeGames, validateStats } from "./profile-model";
import type { GameStat } from "./profile-model";

const storageKey = "esports.profile.rudra.stats.v1";

function loadGames() {
  try {
    return parseSavedGames(localStorage.getItem(storageKey));
  } catch {
    return parseSavedGames(null);
  }
}

function getGameIcon(name: string) {
  switch (name) {
    case "Valorant":
      return <Target size={20} />;
    case "League of Legends":
      return <Swords size={20} />;
    case "CS:GO":
      return <Crosshair size={20} />;
    case "Dota 2":
      return <Gamepad2 size={20} />;
    case "Fortnite":
      return <Rocket size={20} />;
    default:
      return <Gamepad2 size={20} />;
  }
}

type GameCardProps = {
  game: GameStat;
  onRemove: (id: number) => void;
};

function GameCard({ game, onRemove }: GameCardProps) {
  return (
    <li className="profile__game-card">
      <div className="profile__game-logo" aria-hidden="true">{getGameIcon(game.name)}</div>
      <h3 className="profile__game-name">{game.name}</h3>
      <p className="profile__game-detail">
        Hours Played: <span>{game.hoursPlayed}</span>
      </p>
      <p className="profile__game-detail">
        Highest Score: <span>{game.highestScore}</span>
      </p>
      <p className="profile__game-detail">
        Current Rank: <span>{game.rank}</span>
      </p>
      <button type="button" className="profile__remove-stat" onClick={() => onRemove(game.id)}
        aria-label={`Remove stats for ${game.name}`}>Remove stats</button>
    </li>
  );
}

type ProfileProps = {
  favouriteGames: string[];
  onRemoveFavourite: (game: string) => void;
};

function Profile({ favouriteGames, onRemoveFavourite }: ProfileProps) {
  const [games, setGames] = useState<GameStat[]>(loadGames);
  const [form, setForm] = useState({
    name: "",
    hoursPlayed: "",
    highestScore: "",
    rank: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [storageError, setStorageError] = useState("");
  const summary = summarizeGames(games);

  const saveGames = (nextGames: GameStat[]) => {
    setGames(nextGames);
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextGames));
      setStorageError("");
    } catch {
      setStorageError("Stats are available for this session, but could not be saved on this device.");
    }
  };

  const handleRemove = (id: number) => {
    saveGames(games.filter(game => game.id !== id));
    setMessage("Game stats removed.");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateStats(form, games);
    setError(validationError);
    setMessage("");
    if (validationError) return;

    const newGame: GameStat = {
      id: Math.max(0, ...games.map(game => game.id)) + 1,
      name: form.name.trim(),
      hoursPlayed: Number(form.hoursPlayed),
      highestScore: Number(form.highestScore),
      rank: form.rank.trim() || "Unranked",
    };

    saveGames([...games, newGame]);
    setMessage(`${newGame.name} stats added.`);
    setForm({ name: "", hoursPlayed: "", highestScore: "", rank: "" });
  };

  return (
    <section className="profile">
      <header className="profile__header">
        <h1 className="profile__title">Player Profile</h1>
        <p className="profile__username">Username: Rudra</p>
      </header>

      <p className="profile__notice">Demo profile for Rudra Patel. Personal stats are saved on this device.</p>
      <p role="status" className="profile__feedback">{message}</p>
      {storageError && <p role="alert" className="profile__error">{storageError}</p>}
      <dl className="profile__totals" aria-label="Overall performance">
        <div><dt>Games played</dt><dd>{summary.gamesPlayed}</dd></div>
        <div><dt>Total hours</dt><dd>{Number(summary.totalHours.toFixed(2))}</dd></div>
        <div><dt>Most played</dt><dd>{summary.mostPlayed?.name ?? "No games yet"}</dd></div>
      </dl>
      <section className="profile__summary">
        <h2 className="profile__subtitle">Game Performance Summary</h2>
        {games.length === 0 && <p>No game stats yet. Add your first game below.</p>}
        <ul className="profile__games-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onRemove={handleRemove} />
          ))}
        </ul>
      </section>

      <section className="profile__section">
        <h2 className="profile__subtitle">Add Your Stats</h2>
        <p id="profile-form-help">Add one card per game. Rank is optional; hours and score can be zero.</p>
        {error && <p id="profile-form-error" role="alert" className="profile__error">{error}</p>}
        <form className="profile__form" onSubmit={handleSubmit} aria-describedby={error ? "profile-form-help profile-form-error" : "profile-form-help"}>
          <label className="profile__form-label">
            Game
            <input
              type="text"
              className="profile__form-input"
              placeholder="e.g. Apex Legends"
              required
              maxLength={80}
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>
          <label className="profile__form-label">
            Hours Played
            <input
              type="number"
              min={0}
              className="profile__form-input"
              required
              step="any"
              value={form.hoursPlayed}
              onChange={(event) => setForm({ ...form, hoursPlayed: event.target.value })}
            />
          </label>
          <label className="profile__form-label">
            Highest Score
            <input
              type="number"
              min={0}
              className="profile__form-input"
              required
              step="1"
              max={Number.MAX_SAFE_INTEGER}
              value={form.highestScore}
              onChange={(event) => setForm({ ...form, highestScore: event.target.value })}
            />
          </label>
          <label className="profile__form-label">
            Rank
            <input
              type="text"
              className="profile__form-input"
              placeholder="e.g. Diamond"
              maxLength={40}
              value={form.rank}
              onChange={(event) => setForm({ ...form, rank: event.target.value })}
            />
          </label>
          <button type="submit" className="profile__form-button">
            Add Game Stat
          </button>
        </form>
      </section>

      <section className="profile__section">
        <h2 className="profile__subtitle">Favourite Games</h2>
        {favouriteGames.length > 0 ? (
          <ul className="profile__favourites-list">
            {favouriteGames.map((game) => (
              <li key={game} className="profile__favourite-item">
                <span className="profile__favourite-icon">{getGameIcon(game)}</span>
                <span className="profile__favourite-name">{game}</span>
                <button
                  type="button"
                  className="profile__favourite-remove"
                  onClick={() => { onRemoveFavourite(game); setMessage(`${game} removed from favourites.`); }}
                  aria-label={`Remove ${game} from favourites`}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="profile__favourites-empty">
            No favourite games yet. Add some from the Dashboard.
          </p>
        )}
      </section>
    </section>
  );
}

export default Profile;

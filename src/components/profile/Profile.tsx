import React, { useState } from "react";
import "./Profile.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target } from "lucide-react";

import { useProfileStats } from "../../hooks/useProfileStats";
import type { GameStat } from "../../types/profile";
import FavouriteGames from "../shared/FavouriteGames";

function ProfileSummary() {
  const { summary } = useProfileStats();
  return <dl className="profile__totals" aria-label="Overall performance">
    <div><dt>Games played</dt><dd>{summary.gamesPlayed}</dd></div>
    <div><dt>Total hours</dt><dd>{Number(summary.totalHours.toFixed(2))}</dd></div>
    <div><dt>Most played</dt><dd>{summary.mostPlayed?.name ?? "No games yet"}</dd></div>
  </dl>;
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
  onEdit: (game: GameStat) => void;
};

function GameCard({ game, onRemove, onEdit }: GameCardProps) {
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
      <button type="button" className="profile__remove-stat" onClick={() => onEdit(game)}>Edit stats</button>
      <button type="button" className="profile__remove-stat" onClick={() => onRemove(game.id)}
        aria-label={`Remove stats for ${game.name}`}>Remove stats</button>
    </li>
  );
}

function Profile() {
  const { games, error, message, storageError, remember, add, update, remove, setRemember } = useProfileStats();
  const [editingId, setEditingId] = useState<number | undefined>();
  const [form, setForm] = useState({
    name: "",
    hoursPlayed: "",
    highestScore: "",
    rank: "",
  });

  const resetForm = () => { setEditingId(undefined); setForm({ name: "", hoursPlayed: "", highestScore: "", rank: "" }); };
  const handleEdit = (game: GameStat) => {
    setEditingId(game.id);
    setForm({ name: game.name, hoursPlayed: String(game.hoursPlayed), highestScore: String(game.highestScore), rank: game.rank });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editingId === undefined ? add(form) : update(editingId, form)) resetForm();
  };

  return (
    <section className="profile">
      <header className="profile__header">
        <h1 className="profile__title">Player Profile</h1>
        <p className="profile__username">Username: Rudra</p>
      </header>

      <p className="profile__notice">Demo profile for Rudra Patel. Stats remain in this session unless you choose to remember them.</p>
      <p role="status" className="profile__feedback">{message}</p>
      {storageError && <p role="alert" className="profile__error">{storageError}</p>}
      <label className="profile__notice"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} /> Remember my stats on this device</label>
      <p>Turning this off removes saved stats from this device and keeps your current session.</p>
      <ProfileSummary />
      <section className="profile__summary">
        <h2 className="profile__subtitle">Game Performance Summary</h2>
        {games.length === 0 && <p>No game stats yet. Add your first game below.</p>}
        <ul className="profile__games-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onRemove={(id) => { if (remove(id) && editingId === id) resetForm(); }} onEdit={handleEdit} />
          ))}
        </ul>
      </section>

      <section className="profile__section">
        <h2 className="profile__subtitle">{editingId === undefined ? "Add Your Stats" : "Edit Your Stats"}</h2>
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
            {editingId === undefined ? "Add Game Stat" : "Save Changes"}
          </button>
          {editingId !== undefined && <button type="button" className="profile__form-button" onClick={resetForm}>Cancel edit</button>}
        </form>
      </section>

      <FavouriteGames />
    </section>
  );
}

export default Profile;

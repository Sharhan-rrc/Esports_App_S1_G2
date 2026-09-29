import React, { useState } from "react";
import "./Profile.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target, X } from "lucide-react";

type GameStat = {
  id: number;
  name: string;
  hoursPlayed: number;
  highestScore: number;
  rank: string;
};

const initialGames: GameStat[] = [
  { id: 1, name: "Valorant", hoursPlayed: 120, highestScore: 32, rank: "Gold" },
  { id: 2, name: "League of Legends", hoursPlayed: 200, highestScore: 18, rank: "Platinum" },
  { id: 3, name: "CS:GO", hoursPlayed: 90, highestScore: 27, rank: "Silver" },
];

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
};

function GameCard({ game }: GameCardProps) {
  return (
    <li className="profile__game-card">
      <div className="profile__game-logo">{getGameIcon(game.name)}</div>
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
    </li>
  );
}

type ProfileProps = {
  favouriteGames: string[];
  onRemoveFavourite: (game: string) => void;
};

function Profile({ favouriteGames, onRemoveFavourite }: ProfileProps) {
  const [games, setGames] = useState<GameStat[]>(initialGames);
  const [form, setForm] = useState({
    name: "",
    hoursPlayed: "",
    highestScore: "",
    rank: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    const newGame: GameStat = {
      id: Date.now(),
      name: form.name.trim(),
      hoursPlayed: Number(form.hoursPlayed) || 0,
      highestScore: Number(form.highestScore) || 0,
      rank: form.rank.trim() || "Unranked",
    };

    setGames((prev) => [...prev, newGame]);
    setForm({ name: "", hoursPlayed: "", highestScore: "", rank: "" });
  };

  return (
    <section className="profile">
      <header className="profile__header">
        <h1 className="profile__title">Player Profile</h1>
        <p className="profile__username">Username: Rudra</p>
      </header>

      <section className="profile__summary">
        <h2 className="profile__subtitle">Game Performance Summary</h2>
        <ul className="profile__games-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      </section>

      <section className="profile__section">
        <h2 className="profile__subtitle">Add Your Stats</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__form-label">
            Game
            <input
              type="text"
              className="profile__form-input"
              placeholder="e.g. Apex Legends"
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
                  onClick={() => onRemoveFavourite(game)}
                  aria-label={`Remove ${game} from favourites`}
                >
                  <X size={16} />
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

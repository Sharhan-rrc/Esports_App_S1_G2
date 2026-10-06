import { useState } from "react";
import "./Profile.css";
import { sampleGameStats } from "../../data/samplegames";
import type { GameStat } from "../../types";

type GameCardProps = {
  game: GameStat;
};

type ProfileProps = {
  favouriteGames: string[];
  onRemoveFavourite: (game: string) => void;
};

function GameCard({ game }: GameCardProps) {
  return (
    <li className="profile__game-card">
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

function Profile({ favouriteGames, onRemoveFavourite }: ProfileProps) {
  const [games, setGames] = useState<GameStat[]>(sampleGameStats);
  const [newGame, setNewGame] = useState({
    name: "",
    hoursPlayed: "",
    highestScore: "",
    rank: "",
  });

  const handleAddGame = (event: React.FormEvent) => {
    event.preventDefault();
    setGames((currentGames) => [
      ...currentGames,
      {
        id: Date.now(),
        name: newGame.name,
        hoursPlayed: Number(newGame.hoursPlayed),
        highestScore: Number(newGame.highestScore),
        rank: newGame.rank,
      },
    ]);
    setNewGame({ name: "", hoursPlayed: "", highestScore: "", rank: "" });
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

      <section className="profile__summary">
        <h2 className="profile__subtitle">Add Game Stats</h2>
        <form className="profile__stats-form" onSubmit={handleAddGame}>
          <label>
            Game
            <input
              required
              type="text"
              value={newGame.name}
              onChange={(event) => setNewGame({ ...newGame, name: event.target.value })}
            />
          </label>
          <label>
            Hours Played
            <input
              required
              min="0"
              type="number"
              value={newGame.hoursPlayed}
              onChange={(event) => setNewGame({ ...newGame, hoursPlayed: event.target.value })}
            />
          </label>
          <label>
            Highest Score
            <input
              required
              min="0"
              type="number"
              value={newGame.highestScore}
              onChange={(event) => setNewGame({ ...newGame, highestScore: event.target.value })}
            />
          </label>
          <label>
            Rank
            <input
              required
              type="text"
              value={newGame.rank}
              onChange={(event) => setNewGame({ ...newGame, rank: event.target.value })}
            />
          </label>
          <button type="submit">Add Game Stats</button>
        </form>
      </section>

      <section className="profile__summary">
        <h2 className="profile__subtitle">Favourite Games</h2>
        <ul className="profile__games-list">
          {favouriteGames.length > 0 ? (
            favouriteGames.map((game) => (
              <li key={game} className="profile__game-card">
                <h3 className="profile__game-name">{game}</h3>
                <button type="button" onClick={() => onRemoveFavourite(game)}>
                  Remove
                </button>
              </li>
            ))
          ) : (
            <li className="profile__game-card">No favourite games yet.</li>
          )}
        </ul>
      </section>
    </section>
  );
};

export default Profile;
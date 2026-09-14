import React from "react";
import "./Leaderboard.css";

interface Player {
  id: number;
  name: string;
  game: string;
  score: number;
  position: number;
}

const Leaderboard: React.FC = () => {
  const players: Player[] = [
    { id: 1, name: "Skaiser", game: "Valorant", score: 3200, position: 1 },
    { id: 2, name: "ShadowFox", game: "Valorant", score: 2950, position: 2 },
    { id: 3, name: "NeonBlade", game: "Valorant", score: 2800, position: 3 },
    { id: 4, name: "PixelStorm", game: "Valorant", score: 2600, position: 4 },
  ];

  return (
    <section className="leaderboard">
      <header className="leaderboard__header">
        <h1 className="leaderboard__title">Valorant Leaderboard</h1>
        <p className="leaderboard__description">
          View the top players and their highest scores.
        </p>
      </header>

      <table className="leaderboard__table" aria-label="Valorant leaderboard">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Player</th>
            <th scope="col">Game</th>
            <th scope="col">Highest Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.position}</td>
              <td>{player.name}</td>
              <td>{player.game}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;
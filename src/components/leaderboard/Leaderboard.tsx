import React, { useMemo, useState } from "react";
import "./Leaderboard.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target } from "lucide-react";

interface Player {
  id: number;
  name: string;
  score: number;
  position: number;
}

const GAMES = ["Valorant", "League of Legends", "CS:GO", "Dota 2", "Fortnite"];

const PLAYER_POOL = [
  "Skaiser",
  "ShadowFox",
  "NeonBlade",
  "PixelStorm",
  "AceHunter",
  "MysticBlade",
  "VortexKing",
  "GhostRunner",
  "IronWolf",
  "SilentArrow",
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

// Random data is fine for this sprint per the brief.
function generateLeaderboard(): Player[] {
  const shuffled = [...PLAYER_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
  const scores = shuffled
    .map(() => Math.floor(Math.random() * 2000) + 1000)
    .sort((a, b) => b - a);

  return shuffled.map((name, index) => ({
    id: index + 1,
    name,
    score: scores[index],
    position: index + 1,
  }));
}

const Leaderboard: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>(GAMES[0]);
  // Regenerated whenever the selected game changes
  const players = useMemo(() => generateLeaderboard(), [selectedGame]);

  return (
    <section className="leaderboard">
      <header className="leaderboard__header">
        <div className="leaderboard__title-row">
          <span className="leaderboard__logo">{getGameIcon(selectedGame)}</span>
          <h1 className="leaderboard__title">{selectedGame} Leaderboard</h1>
        </div>
        <p className="leaderboard__description">
          View the top players and their highest scores.
        </p>
      </header>

      <form className="leaderboard__form" onSubmit={(event) => event.preventDefault()}>
        <label className="leaderboard__form-label">
          Select a game
          <select
            className="leaderboard__form-select"
            value={selectedGame}
            onChange={(event) => setSelectedGame(event.target.value)}
          >
            {GAMES.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="leaderboard__table-wrap">
        <table className="leaderboard__table" aria-label={`${selectedGame} leaderboard`}>
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Player</th>
              <th scope="col">Highest Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.position}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;

import React from "react";
import "./Leaderboard.css";
import { Crosshair, Gamepad2, Plus, Rocket, Swords, Target } from "lucide-react";

interface Player {
  id: number;
  name: string;
  score: number;
  position: number;
}

interface GameLeaderboard {
  name: string;
  players: Player[];
}

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

const GAME_LEADERBOARDS: GameLeaderboard[] = [
  {
    name: "Valorant",
    players: [
      { id: 1, name: "Skaiser", score: 2980, position: 1 },
      { id: 2, name: "ShadowFox", score: 2740, position: 2 },
      { id: 3, name: "NeonBlade", score: 2510, position: 3 },
      { id: 4, name: "PixelStorm", score: 2260, position: 4 },
      { id: 5, name: "AceHunter", score: 2040, position: 5 },
    ],
  },
  {
    name: "League of Legends",
    players: [
      { id: 1, name: "MysticBlade", score: 3120, position: 1 },
      { id: 2, name: "VortexKing", score: 2890, position: 2 },
      { id: 3, name: "GhostRunner", score: 2650, position: 3 },
      { id: 4, name: "IronWolf", score: 2380, position: 4 },
      { id: 5, name: "SilentArrow", score: 2190, position: 5 },
    ],
  },
  {
    name: "CS:GO",
    players: [
      { id: 1, name: "ShadowFox", score: 3260, position: 1 },
      { id: 2, name: "AceHunter", score: 3010, position: 2 },
      { id: 3, name: "Skaiser", score: 2780, position: 3 },
      { id: 4, name: "IronWolf", score: 2470, position: 4 },
      { id: 5, name: "PixelStorm", score: 2310, position: 5 },
    ],
  },
  {
    name: "Dota 2",
    players: [
      { id: 1, name: "VortexKing", score: 3050, position: 1 },
      { id: 2, name: "NeonBlade", score: 2820, position: 2 },
      { id: 3, name: "MysticBlade", score: 2590, position: 3 },
      { id: 4, name: "SilentArrow", score: 2420, position: 4 },
      { id: 5, name: "GhostRunner", score: 2150, position: 5 },
    ],
  },
  {
    name: "Fortnite",
    players: [
      { id: 1, name: "AceHunter", score: 3190, position: 1 },
      { id: 2, name: "PixelStorm", score: 2930, position: 2 },
      { id: 3, name: "IronWolf", score: 2710, position: 3 },
      { id: 4, name: "ShadowFox", score: 2490, position: 4 },
      { id: 5, name: "Skaiser", score: 2200, position: 5 },
    ],
  },
];

const Leaderboard: React.FC = () => {
  const [gameLeaderboards, setGameLeaderboards] = React.useState(GAME_LEADERBOARDS);
  const [selectedGame, setSelectedGame] = React.useState(GAME_LEADERBOARDS[0].name);
  const [playerName, setPlayerName] = React.useState("");
  const [score, setScore] = React.useState("");

  const handleAddScore = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = playerName.trim();
    const numericScore = Number(score);

    if (!trimmedName || !Number.isFinite(numericScore) || numericScore < 0) {
      return;
    }

    setGameLeaderboards((currentLeaderboards) =>
      currentLeaderboards.map((game) => {
        if (game.name !== selectedGame) {
          return game;
        }

        const newPlayer: Player = {
          id: Math.max(0, ...game.players.map((player) => player.id)) + 1,
          name: trimmedName,
          score: numericScore,
          position: 0,
        };
        const players = [...game.players, newPlayer]
          .sort((firstPlayer, secondPlayer) => secondPlayer.score - firstPlayer.score)
          .map((player, index) => ({ ...player, position: index + 1 }));

        return { ...game, players };
      }),
    );

    setPlayerName("");
    setScore("");
  };

  return (
    <section className="leaderboard">
      <header className="leaderboard__header">
        <h1 className="leaderboard__title">Game Leaderboards</h1>
        <p className="leaderboard__description">
          View the top players and their highest scores across every game.
        </p>
      </header>

      <form className="leaderboard__add-score" onSubmit={handleAddScore}>
        <div className="leaderboard__form-heading">
          <span className="leaderboard__form-icon" aria-hidden="true">
            <Plus size={20} />
          </span>
          <div>
            <h2>Add score</h2>
            <p>Add a player to the selected game leaderboard.</p>
          </div>
        </div>
        <div className="leaderboard__form-fields">
          <label>
            Select game
            <select value={selectedGame} onChange={(event) => setSelectedGame(event.target.value)}>
              {gameLeaderboards.map((game) => (
                <option key={game.name} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Player name
            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Enter player name"
              required
            />
          </label>
          <label>
            Score
            <input
              type="number"
              value={score}
              onChange={(event) => setScore(event.target.value)}
              placeholder="0"
              min="0"
              step="1"
              required
            />
          </label>
          <button type="submit">Add score</button>
        </div>
      </form>

      <div className="leaderboard__games">
        {gameLeaderboards.map((game) => (
          <article className="leaderboard__game" key={game.name}>
            <div className="leaderboard__title-row">
              <span className="leaderboard__logo">{getGameIcon(game.name)}</span>
              <h2 className="leaderboard__game-title">{game.name}</h2>
            </div>
            <div className="leaderboard__table-wrap">
              <table className="leaderboard__table" aria-label={`${game.name} leaderboard`}>
                <thead>
                  <tr>
                    <th scope="col">Position</th>
                    <th scope="col">Player</th>
                    <th scope="col">Highest Score</th>
                  </tr>
                </thead>
                <tbody>
                  {game.players.map((player) => (
                    <tr key={player.id}>
                      <td>{player.position}</td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;

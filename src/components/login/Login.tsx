import React, { useState } from "react";
import "./Login.css";
import { Crosshair, Gamepad2, Rocket, Swords, Target, Trophy } from "lucide-react";

type LoginProps = {
  onLogin: (selectedGames: string[]) => void;
};

interface GameOption {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const GAME_OPTIONS: GameOption[] = [
  { id: 1, name: "Valorant", icon: <Target size={18} /> },
  { id: 2, name: "League of Legends", icon: <Swords size={18} /> },
  { id: 3, name: "CS:GO", icon: <Crosshair size={18} /> },
  { id: 4, name: "Dota 2", icon: <Gamepad2 size={18} /> },
  { id: 5, name: "Fortnite", icon: <Rocket size={18} /> },
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const benefits = [
    "Track your game stats",
    "Compete on leaderboards",
    "Watch live esports streams",
  ];

  // Sprint 2: mock login now opens a game-picker popup before handing off
  // the selection to the shared `interestedGames` state in App.
  const [showGamePopup, setShowGamePopup] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const toggleGame = (name: string) => {
    setSelectedGames((prev) =>
      prev.includes(name) ? prev.filter((game) => game !== name) : [...prev, name]
    );
  };

  const handleContinue = () => {
    onLogin(selectedGames);
  };

  return (
    <section className="login">
      <h1 className="login__title">
        <Trophy className="login__title-icon" aria-hidden="true" />
        Esports Hub Login
      </h1>
      <form
        className="login__form"
        onSubmit={(event) => {
          event.preventDefault();
          setShowGamePopup(true);
        }}
      >
        <label className="login__label">
          Email
          <input
            type="email"
            className="login__input"
            placeholder="you@example.com"
          />
        </label>
        <label className="login__label">
          Password
          <input
            type="password"
            className="login__input"
            placeholder="••••••••"
          />
        </label>
        <button type="submit" className="login__button">
          Log In
        </button>
      </form>

      <section className="login__benefits">
        <h2 className="login__subtitle">Why join Esports Hub?</h2>
        <ul className="login__benefits-list">
          {benefits.map((item, index) => (
            <li key={index} className="login__benefit-item">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {showGamePopup && (
        <div
          className="login__popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-popup-title"
        >
          <div className="login__popup">
            <h2 id="game-popup-title" className="login__popup-title">
              Pick Your Games
            </h2>
            <p className="login__popup-subtitle">
              Select the games you're interested in. You can add more later.
            </p>
            <ul className="login__popup-list">
              {GAME_OPTIONS.map((game) => (
                <li key={game.id} className="login__popup-item">
                  <label className="login__popup-label">
                    <input
                      type="checkbox"
                      checked={selectedGames.includes(game.name)}
                      onChange={() => toggleGame(game.name)}
                    />
                    <span className="login__popup-icon">{game.icon}</span>
                    {game.name}
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="login__button login__popup-continue"
              onClick={handleContinue}
              disabled={selectedGames.length === 0}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;

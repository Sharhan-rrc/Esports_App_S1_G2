import React from "react";
import "./Login.css";

type LoginProps = {
  onLogin: () => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const benefits = [
    "Track your game stats",
    "Compete on leaderboards",
    "Watch live esports streams",
  ];

  return (
    <section className="login">
      <h1 className="login__title">Esports Hub Login</h1>
      <form
        className="login__form"
        onSubmit={(event) => {
          event.preventDefault();
          onLogin();
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
    </section>
  );
};

export default Login;

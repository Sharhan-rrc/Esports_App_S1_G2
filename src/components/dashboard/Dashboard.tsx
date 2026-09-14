import React from "react";
import "./Dashboard.css";

interface GameCard {
  id: number;
  name: string;
  genre: string;
  topPlayer: string;
}

interface LiveStream {
  id: number;
  title: string;
  game: string;
  platform: string;
}

const Dashboard: React.FC = () => {
  const games: GameCard[] = [
    { id: 1, name: "Valorant", genre: "FPS", topPlayer: "AceHunter" },
    { id: 2, name: "League of Legends", genre: "MOBA", topPlayer: "ShadowFox" },
    { id: 3, name: "CS:GO", genre: "FPS", topPlayer: "NeonBlade" },
  ];

  const liveStreams: LiveStream[] = [
    { id: 1, title: "Valorant Finals", game: "Valorant", platform: "YouTube" },
    { id: 2, title: "LoL Championship", game: "League of Legends", platform: "Twitch" },
    { id: 3, title: "CS:GO Major", game: "CS:GO", platform: "YouTube" },
  ];

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Esports Hub Dashboard</h1>
        <p className="dashboard__subtitle">
          Explore top games, players, and live esports streams.
        </p>
      </header>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Featured Games</h2>
        <div className="dashboard__games-grid">
          {games.map((game) => (
            <article key={game.id} className="dashboard__game-card">
              <h3 className="dashboard__game-name">{game.name}</h3>
              <p className="dashboard__game-genre">Genre: {game.genre}</p>
              <p className="dashboard__game-top-player">
                Top Player: <span>{game.topPlayer}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard__section">
        <h2 className="dashboard__section-title">Live Streams</h2>
        <ul className="dashboard__streams-list">
          {liveStreams.map((stream) => (
            <li key={stream.id} className="dashboard__stream-item">
              <h3 className="dashboard__stream-title">{stream.title}</h3>
              <p className="dashboard__stream-detail">
                Game: <span>{stream.game}</span> · Platform: <span>{stream.platform}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Dashboard;
 
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

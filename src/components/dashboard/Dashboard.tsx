import React from "react";
import "./Dashboard.css";

interface DashboardProps {
  interestedGames: string[];
  favouriteGames: string[];
  onAddFavourite: (game: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  interestedGames,
  favouriteGames,
  onAddFavourite,
}) => {
  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Esports Hub Dashboard</h1>
        <p className="dashboard__subtitle">
          Explore top games, players, and live esports streams.
        </p>
      </header>
    </section>
  );
};

export default Dashboard;
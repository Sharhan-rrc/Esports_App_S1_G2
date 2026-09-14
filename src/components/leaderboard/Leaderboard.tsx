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
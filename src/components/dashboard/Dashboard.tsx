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

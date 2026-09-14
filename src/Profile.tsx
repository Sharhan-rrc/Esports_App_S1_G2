import React from "react";
import "./Profile.css";
 
interface GameStat {
  id: number;
  name: string;
  hoursPlayed: number;
  highestScore: number;
  rank: string;
}
 
const Profile: React.FC = () => {
  const games: GameStat[] = [
    { id: 1, name: "Valorant", hoursPlayed: 120, highestScore: 32, rank: "Gold" },
    { id: 2, name: "League of Legends", hoursPlayed: 200, highestScore: 18, rank: "Platinum" },
    { id: 3, name: "CS:GO", hoursPlayed: 90, highestScore: 27, rank: "Silver" },
  ];
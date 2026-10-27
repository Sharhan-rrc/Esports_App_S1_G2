import { Crosshair, Gamepad2, Rocket, Swords, Target } from "lucide-react";

/** Presentation-only badge shared by leaderboard tables; no resource logic. */
export default function GameIcon({ game }: { game: string }) {
  switch (game) {
    case "Valorant": return <Target size={22} />;
    case "League of Legends": return <Swords size={22} />;
    case "CS:GO": return <Crosshair size={22} />;
    case "Dota 2": return <Gamepad2 size={22} />;
    case "Fortnite": return <Rocket size={22} />;
    default: return <Gamepad2 size={22} />;
  }
}

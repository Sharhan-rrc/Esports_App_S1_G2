import { useState } from "react";
import Profile from "./components/profile/Profile";

function App() {
  const [favouriteGames, setFavouriteGames] = useState<string[]>([
    "Valorant",
    "CS:GO",
  ]);

  const handleRemoveFavourite = (game: string) => {
    setFavouriteGames((current) => current.filter((item) => item !== game));
  };

  return (
    <Profile
      favouriteGames={favouriteGames}
      onRemoveFavourite={handleRemoveFavourite}
    />
  );
}

export default App;

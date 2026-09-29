import "./Profile.css";

type GameStat = {
  id: number;
  name: string;
  hoursPlayed: number;
  highestScore: number;
  rank: string;
};

const games: GameStat[] = [
  { id: 1, name: "Valorant", hoursPlayed: 120, highestScore: 32, rank: "Gold" },
  { id: 2, name: "League of Legends", hoursPlayed: 200, highestScore: 18, rank: "Platinum" },
  { id: 3, name: "CS:GO", hoursPlayed: 90, highestScore: 27, rank: "Silver" },
];

type GameCardProps = {
  game: GameStat;
};

type ProfileProps = {
  favouriteGames: string[];
  onRemoveFavourite: (game: string) => void;
};

function GameCard({ game }: GameCardProps) {
  return (
    <li className="profile__game-card">
      <h3 className="profile__game-name">{game.name}</h3>
      <p className="profile__game-detail">
        Hours Played: <span>{game.hoursPlayed}</span>
      </p>
      <p className="profile__game-detail">
        Highest Score: <span>{game.highestScore}</span>
      </p>
      <p className="profile__game-detail">
        Current Rank: <span>{game.rank}</span>
      </p>
    </li>
  );
}

function Profile({ favouriteGames, onRemoveFavourite }: ProfileProps) {
  return (
    <section className="profile">
      <header className="profile__header">
        <h1 className="profile__title">Player Profile</h1>
        <p className="profile__username">Username: Rudra</p>
      </header>

      <section className="profile__summary">
        <h2 className="profile__subtitle">Game Performance Summary</h2>
        <ul className="profile__games-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </ul>
      </section>

      <section className="profile__summary">
        <h2 className="profile__subtitle">Favourite Games</h2>
        <ul className="profile__games-list">
          {favouriteGames.length > 0 ? (
            favouriteGames.map((game) => (
              <li key={game} className="profile__game-card">
                <h3 className="profile__game-name">{game}</h3>
                <button type="button" onClick={() => onRemoveFavourite(game)}>
                  Remove
                </button>
              </li>
            ))
          ) : (
            <li className="profile__game-card">No favourite games yet.</li>
          )}
        </ul>
      </section>
    </section>
  );
};

export default Profile;
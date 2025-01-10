interface Game {
  id: number;
  title: string;
  year: number | null;
  image: string | null;
  image_2: string | null;
}

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="game-card">
      <h3>{game.title}</h3>
      <p>Year: {game.year ? game.year : "N/A"}</p>
      {game.image && <img src={game.image} alt={`${game.title} cover`} />}
      {game.image_2 && (
        <img src={game.image_2} alt={`${game.title} alternate cover`} />
      )}
    </div>
  );
}

export default GameCard;

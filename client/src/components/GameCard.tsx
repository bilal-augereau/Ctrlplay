interface Game {
  id: number;
  title: string;
  year: number | null;
}

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="game-card">
      <h3>{game.title}</h3>
      <p>Year: {game.year ? game.year : "N/A"}</p>
    </div>
  );
}

export default GameCard;

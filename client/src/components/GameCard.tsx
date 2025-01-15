import { useState } from "react";
import "./GameCard.css";

interface Game {
  id: number;
  title: string;
  year: number | null;
  image: string | null;
  genre?: string;
  device?: string[];
}

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="game-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {game.image && <img src={game.image} alt={`${game.title} cover`} />}
      {isHovered && (
        <div className="hover-details">
          <h3>{game.title}</h3>
          <p>Year: {game.year ? game.year : "N/A"}</p>
          <p>Genre: {game.genre || "Unknown"}</p>
          <p>Device: {game.device?.join(", ") || "Unknown"}</p>
        </div>
      )}
    </div>
  );
}

export default GameCard;

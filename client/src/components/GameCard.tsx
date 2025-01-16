import { useState } from "react";
import type GameType from "../interface/GameType";
import "./GameCard.css";

interface GameCardProps {
  game: GameType;
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
          <p>Genre: {game.genres || "Unknown"}</p>
          <p>Device: {game.devices?.join(", ") || "Unknown"}</p>
        </div>
      )}
    </div>
  );
}

export default GameCard;

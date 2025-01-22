import type GameType from "../interface/GameType";
import "./GameCard.css";

interface GameCardProps {
  game: GameType;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="card-game">
      {game.image && <img src={game.image} alt={`${game.title} cover`} />}

      <div className="details">
        <h3>{game.title}</h3>
        <p>Year: {game.year ? game.year : "N/A"}</p>
        <p>Genres: {game.genres || "Unknown"}</p>
        <p>Devices: {game.devices?.join(", ") || "Unknown"}</p>
        <div className="button-container">
          <button type="button">❤️</button>
          <button type="button">⭐</button>
          <button type="button">➕</button>
          <button type="button">✅</button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;

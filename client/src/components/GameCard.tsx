import type GameType from "../interface/GameType";
import "./GameCard.css";

interface GameCardProps {
	game: GameType;
}

function GameCard({ game }: GameCardProps) {
	return <div>{game.title}</div>;
}

export default GameCard;

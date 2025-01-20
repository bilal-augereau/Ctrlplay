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
			className={`card-game ${isHovered ? "hovered" : ""}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{game.image && <img src={game.image} alt={`${game.title} cover`} />}

			<div className="hover-details">
				<h3>{game.title}</h3>
				<p>Year: {game.year ? game.year : "N/A"}</p>
				<p>Genres: {game.genres || "Unknown"}</p>
				<p>Devices: {game.devices?.join(", ") || "Unknown"}</p>
				<div className="button-container">
					<button type="button" className="beautiful-buttonadd">
						❤️
					</button>
					<button type="button" className="beautiful-buttonadd">
						⭐
					</button>
					<button type="button" className="beautiful-buttonadd">
						➕
					</button>
					<button type="button" className="beautiful-buttonadd">
						✅
					</button>
				</div>
			</div>
		</div>
	);
}

export default GameCard;

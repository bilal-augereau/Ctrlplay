import GameDevices from "./GameDevices";

import type GameType from "../../interface/GameType";

import "./GameCard.css";
import GameButtons from "../buttons/GameButtons";

interface GameCardProps {
	game: GameType;
}

function GameCard({ game }: GameCardProps) {
	return (
		<div className="card-game">
			{game.image && <img src={game.image} alt={`${game.title} cover`} />}

			<div className="details">
				<h3>{game.title}</h3>
				<div className="device-container">
					{game.devices && typeof game.devices === "string" ? (
						<GameDevices
							devices={(game.devices as string)
								.split(",")
								.map(
									(device: string) =>
										device.trim() as
											| "PlayStation"
											| "Nintendo"
											| "PC"
											| "Xbox"
											| "Others",
								)}
						/>
					) : game.devices && Array.isArray(game.devices) ? (
						<GameDevices devices={game.devices} />
					) : (
						<>
							<p>Devices: Unknown</p>
						</>
					)}
				</div>
				<GameButtons game={game} />
				<p>{game.genres || "Unknown"}</p>
			</div>
		</div>
	);
}

export default GameCard;

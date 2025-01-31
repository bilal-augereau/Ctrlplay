import { useAuth } from "../../context/UserContext";

import FavoriteButton from "../buttons/FavoriteButton";
import GameShelfButton from "../buttons/GameShelfButton";
import InfosButton from "../buttons/InfosButton";
import GameDevices from "./GameDevices";

import type GameType from "../../interface/GameType";

import "./GameCard.css";

interface GameCardProps {
	game: GameType;
}

function GameCard({ game }: GameCardProps) {
	const { user } = useAuth();

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
						<p>Devices: Unknown</p>
					)}
				</div>

				<p>{game.genres || "Unknown"}</p>
				<div className="button-container">
					<InfosButton id={game.id} />
					{user ? (
						<>
							<GameShelfButton
								userId={user.id}
								gameId={Number.parseInt(game.id)}
							/>
							<FavoriteButton
								userId={user.id}
								gameId={Number.parseInt(game.id)}
							/>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}

export default GameCard;

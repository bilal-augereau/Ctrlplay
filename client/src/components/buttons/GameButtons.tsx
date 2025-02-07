import FavoriteButton from "../buttons/FavoriteButton";
import GameShelfButton from "../buttons/GameShelfButton";
import InfosButton from "../buttons/InfosButton";

import { useState } from "react";
import { useAuth } from "../../context/UserContext";

import type GameType from "../../interface/GameType";
import WishlistButton from "./WishlistButton";

interface GameCardProps {
	userId?: number;
	game: GameType;
}

function GameButtons({ game }: GameCardProps) {
	const { user } = useAuth();
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const [isInLibrary, setIsInLibrary] = useState<boolean>(false);
	return (
		<div className="button-container">
			<InfosButton id={game.id} />
			{user ? (
				<>
					<div id="game-shelf-button">
						<GameShelfButton
							userId={user.id}
							gameId={Number.parseInt(game.id)}
							isFavorite={isFavorite}
							setIsInLibrary={setIsInLibrary}
							isInLibrary={isInLibrary}
						/>
					</div>
					<FavoriteButton
						userId={user.id}
						gameId={Number.parseInt(game.id)}
						isFavorite={isFavorite}
						setIsFavorite={setIsFavorite}
						isInLibrary={isInLibrary}
					/>
					<WishlistButton gameId={Number.parseInt(game.id)} />
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default GameButtons;

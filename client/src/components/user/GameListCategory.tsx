import type DisplayModeCategory from "../../interface/GameCategoryType";
import type GameType from "../../interface/GameType";

import GameCard from "../game/GameCard";
import Tuto from "./Tuto";

interface GameListProps {
	games: GameType[];
	displayMode: DisplayModeCategory;
	gamesRecoLength: number;
	onLoadMore: () => void;
}

const GameList = ({
	games,
	displayMode,
	gamesRecoLength,
	onLoadMore,
}: GameListProps) => (
	<article>
		<h3 id="user-recommandation-title">
			{displayMode === "recommendations"
				? "Recommendations"
				: displayMode === "allGames"
					? "All My Games"
					: displayMode === "favorites"
						? "Favorite Games"
						: "Wishlist"}
		</h3>
		<div id="user-game-list">
			{!games?.length ? (
				<Tuto />
			) : (
				<>
					{(displayMode === "recommendations"
						? games.slice(0, gamesRecoLength - 1)
						: games
					).map((game) => (
						<GameCard game={game} key={game.id} />
					))}
				</>
			)}
		</div>
		{displayMode === "recommendations" && (
			<button
				type="button"
				className="beautiful-button user-beautiful-button"
				onClick={onLoadMore}
			>
				More...
			</button>
		)}
	</article>
);

export default GameList;

import type GameType from "../../interface/GameType";

function Top3({ topGames }: { topGames: GameType[] }) {
	return (
		<div id="user-top-div">
			{topGames[0] && (
				<img
					className="user-top-3"
					src={topGames[0].image}
					alt={topGames[0].title}
				/>
			)}
			{topGames[1] && (
				<img
					className="user-top-3"
					src={topGames[1].image}
					alt={topGames[1].title}
				/>
			)}
			{topGames[2] && (
				<img
					className="user-top-3"
					src={topGames[2].image}
					alt={topGames[2].title}
				/>
			)}
		</div>
	);
}

export default Top3;

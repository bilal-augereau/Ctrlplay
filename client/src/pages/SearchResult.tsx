// fetch sur les 1 useEffect (search et filtres)
// recupérer dans le return, les éléments du search/filtres
// récupérere du context les 4 states de mon contexte
// importer les trucs nécessaires

import { useEffect, useState } from "react";
import GameCard from "../components/game/GameCard";
import { useSearch } from "../context/SearchContext";
import type GameType from "../interface/GameType";
import "./SearchResults.css";

function SearchResults() {
	const { searchQuery, selectedFilters } = useSearch();
	const [games, setGames] = useState<GameType[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchGames = async () => {
			setIsLoading(true);
			const startTime = Date.now();

			try {
				if (searchQuery) {
					const res = await fetch(
						`${import.meta.env.VITE_API_URL}/api/games?search=${searchQuery}`,
					);
					const data = await res.json();
					setGames(data);
				} else {
					const genreParams = selectedFilters.genres
						.map((g) => `genre=${g}`)
						.join("&");
					const deviceParams = selectedFilters.devices
						.map((d) => `device=${d}`)
						.join("&");
					const tagParams = selectedFilters.tags
						.map((t) => `tag=${t}`)
						.join("&");
					const publisherParams = selectedFilters.publishers
						.map((pb) => `publisher=${pb}`)
						.join("&");
					const res = await fetch(
						`${import.meta.env.VITE_API_URL}/api/games?${genreParams}&${deviceParams}&${tagParams}&${publisherParams}`,
					);
					const data = await res.json();
					setGames(data);
				}
			} catch (error) {
				console.error("Error fetching games:", error);
			} finally {
				const endTime = Date.now();
				const timeTaken = endTime - startTime;

				if (timeTaken < 2000) {
					setTimeout(() => {
						setIsLoading(false);
					}, 2000 - timeTaken);
				} else {
					setIsLoading(false);
				}
			}
		};

		fetchGames();
	}, [searchQuery, selectedFilters]);

	return (
		<main>
			<section className="content-box">
				<h1>Search results</h1>
				<article>
					{isLoading ? (
						<div className="loader-container">
							<div className="loader-wrapper">
								<div className="packman" />
								<div className="dots">
									<div className="dot" />
									<div className="dot" />
									<div className="dot" />
									<div className="dot" />
								</div>
							</div>
						</div>
					) : (
						<section className="filtered-games">
							<div className="filtered-games-list">
								{games.length > 0 ? (
									games.map((game) => <GameCard key={game.id} game={game} />)
								) : (
									<p>No existing games</p>
								)}
							</div>
						</section>
					)}
				</article>
			</section>
		</main>
	);
}

export default SearchResults;

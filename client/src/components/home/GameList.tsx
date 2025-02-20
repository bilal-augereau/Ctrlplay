import { useEffect, useState } from "react";
import type GameType from "../../interface/GameType";
import GameCard from "../game/GameCard";
import "./GameList.css";

type Filters = {
	genres: string[];
	devices: string[];
	tags: string[];
	publishers: string[];
};

function GameList() {
	const [games, setGames] = useState<GameType[]>([]);
	const [recentReleases, setRecentReleases] = useState<GameType[]>([]);
	const [allTimeFavorites, setAllTimeFavorites] = useState<GameType[]>([]);
	const [searchQuery] = useState<string>("");
	const [selectedFilters] = useState<Filters>({
		genres: [],
		devices: [],
		tags: [],
		publishers: [],
	});
	const [currentIndexReleases, setCurrentIndexReleases] = useState(0);
	const [currentIndexFavorites, setCurrentIndexFavorites] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const gamesToShow = 5;

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

	const haveFilters = Object.values(selectedFilters).some(
		(filterArray) => filterArray.length > 0,
	);

	useEffect(() => {
		if (!haveFilters) {
			const sortedByYear = [...games]
				.filter((game) => game.year)
				.sort((a, b) => (b.year || 0) - (a.year || 0));
			setRecentReleases(sortedByYear);

			const sortedByNote = [...games]
				.filter((game) => game.note)
				.sort((a, b) => (b.note || 0) - (a.note || 0));
			setAllTimeFavorites(sortedByNote);
		}
	}, [games, haveFilters]);

	const handleSlideReleases = () => {
		setCurrentIndexReleases((prevIndex) =>
			prevIndex + 1 < recentReleases.length - gamesToShow + 1
				? prevIndex + 1
				: 0,
		);
	};

	const handleSlideFavorites = () => {
		setCurrentIndexFavorites((prevIndex) =>
			prevIndex + 1 < allTimeFavorites.length - gamesToShow + 1
				? prevIndex + 1
				: 0,
		);
	};

	return (
		<div className="main-content" id="box-principal">
			{haveFilters || searchQuery ? (
				isLoading ? (
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
				)
			) : (
				<>
					<h2 className="mainh2">Recent Releases</h2>
					<section className="recent-releases">
						<div className="recent-releases-list">
							{recentReleases
								?.slice(
									currentIndexReleases,
									currentIndexReleases + gamesToShow,
								)
								.map((game) => (
									<GameCard key={game.id} game={game} />
								))}
						</div>
						{recentReleases.length > gamesToShow && (
							<button
								type="button"
								className="beautiful-buttonadd"
								id="more-btn"
								onClick={handleSlideReleases}
							>
								See More
							</button>
						)}
					</section>
					<h2 className="mainh2">All-Time Favorites</h2>
					<section className="all-time-favorites">
						<div className="all-time-favorites-list">
							{allTimeFavorites
								?.slice(
									currentIndexFavorites,
									currentIndexFavorites + gamesToShow,
								)
								.map((game) => (
									<GameCard key={game.id} game={game} />
								))}
						</div>
						{allTimeFavorites.length > gamesToShow && (
							<button
								type="button"
								className="beautiful-buttonadd"
								id="more-btn2"
								onClick={handleSlideFavorites}
							>
								See More
							</button>
						)}
					</section>
				</>
			)}
		</div>
	);
}

export default GameList;

import rezio from "../assets/images/avatar/avatarezio.png";
import scorpion from "../assets/images/avatar/avatarscorpion.png";
import spiderman from "../assets/images/avatar/avatarspider.png";

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import FeaturedGame from "../components/GameComponents/GameFeature";
import GameListCategory from "../components/GameComponents/GameListCategory";
import UserWelcome from "../components/UserComponents/UserWelcome";

import type DisplayModeCategory from "../interface/GameCategoryType";
import type GameType from "../interface/GameType";
import type UserType from "../interface/UserType";

import { useGames } from "../services/useGames";

import "./UserPage.css";

function UserPage() {
	const user = useLoaderData() as UserType;
	const [displayMode, setDisplayMode] =
		useState<DisplayModeCategory>("recommendations");
	const [gamesRecoLength, setGamesRecoLength] = useState(20);
	const [gameFeatured, setGameFeatured] = useState<GameType>();
	const { games, loadGames } = useGames(user?.id);

	useEffect(() => {
		const fetchFeaturedGame = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/games/33`,
			);
			const games = await response.json();
			setGameFeatured(games);
		};

		fetchFeaturedGame();
	}, []);

	useEffect(() => {
		if (displayMode === "recommendations") {
			loadGames("recommendations");
		}
	}, [loadGames, displayMode]);

	const handleButtonClick = (mode: DisplayModeCategory) => {
		setDisplayMode(mode);
		loadGames(mode);
	};

	const currentGames = (() => {
		switch (displayMode) {
			case "allGames":
				return games.userGames;
			case "favorites":
				return games.favoriteGames;
			case "toDo":
				return games.toDoGames;
			case "recommendations":
				return games.recommendedGames;
			default:
				return [];
		}
	})();

	return (
		<main id="user-main">
			<aside id="user-aside">
				<UserWelcome user={user} />
				<div>
					<h3>Featured game</h3>
					{gameFeatured && <FeaturedGame game={gameFeatured} />}
				</div>
			</aside>
			<section className="content-box" id="user-main-box">
				<h3>Search a game</h3>
				<p>Search bar component here</p>
				<div id="user-buttons">
					<button
						type="button"
						className="user-buttons"
						id="user-button-1"
						onClick={() => handleButtonClick("favorites")}
					>
						<img src={spiderman} alt="favorites" className="user-buttons-img" />
						Favorites
					</button>
					<button
						type="button"
						className="user-buttons"
						id="user-button-2"
						onClick={() => handleButtonClick("toDo")}
					>
						<img src={rezio} alt="to-do-list" className="user-buttons-img" />
						To do list
					</button>
					<button
						type="button"
						className="user-buttons"
						id="user-button-3"
						onClick={() => handleButtonClick("allGames")}
					>
						<img
							src={scorpion}
							alt="all-my-games"
							className="user-buttons-img"
						/>
						All my games
					</button>
				</div>
				<GameListCategory
					games={currentGames || []}
					displayMode={displayMode}
					gamesRecoLength={gamesRecoLength}
					onLoadMore={() => setGamesRecoLength((prev) => prev + 10)}
				/>
			</section>
		</main>
	);
}

export default UserPage;

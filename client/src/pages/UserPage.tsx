import { useEffect, useState } from "react";

import "./UserPage.css";

import { useAuth } from "../context/UserContext";
import { useGames } from "../services/useGames";

import FeaturedGame from "../components/game/GameFeature";
import GameListCategory from "../components/user/GameListCategory";
import UserWelcome from "../components/user/UserWelcome";

import counterstrike from "../assets/images/avatar/avatarcounterstrike.png";
import rezio from "../assets/images/avatar/avatarezio.png";
import scorpion from "../assets/images/avatar/avatarscorpion.png";
import spiderman from "../assets/images/avatar/avatarspider.png";

import type DisplayModeCategory from "../interface/GameCategoryType";
import type GameType from "../interface/GameType";
import type UserType from "../interface/UserType";

function UserPage() {
	const { user } = useAuth() as { user: UserType };
	const [displayMode, setDisplayMode] =
		useState<DisplayModeCategory>("recommendations");
	const [gamesRecoLength, setGamesRecoLength] = useState(21);
	const [gameFeatured, setGameFeatured] = useState<GameType>();
	const { games, loadGames } = useGames(user.id, user.token);
	const [isLoading, setIsLoading] = useState(false);

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
			handleLoadGames("recommendations");
		}
	}, [displayMode]);

	const handleLoadGames = async (mode: DisplayModeCategory) => {
		setIsLoading(true);
		const startTime = Date.now();

		try {
			await loadGames(mode);
		} catch (error) {
			console.error("Error loading games:", error);
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

	const handleButtonClick = (mode: DisplayModeCategory) => {
		setDisplayMode(mode);
		handleLoadGames(mode);
	};

	const currentGames = (() => {
		switch (displayMode) {
			case "allGames":
				return games.userGames;
			case "favorites":
				return games.favoriteGames;
			case "wishlist":
				return games.wishlistGames;
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
				<div id="user-buttons">
					<button
						type="button"
						className="user-buttons"
						id="user-button-1"
						onClick={() => handleButtonClick("allGames")}
					>
						<img
							src={spiderman}
							alt="all-my-games"
							className="user-buttons-img"
						/>
						All my games
					</button>
					<button
						type="button"
						className="user-buttons"
						id="user-button-2"
						onClick={() => handleButtonClick("favorites")}
					>
						<img src={rezio} alt="favorites" className="user-buttons-img" />
						Favorites
					</button>
					<button
						type="button"
						className="user-buttons"
						id="user-button-3"
						onClick={() => handleButtonClick("wishlist")}
					>
						<img src={scorpion} alt="to-do-list" className="user-buttons-img" />
						Wishlist
					</button>
					<button
						type="button"
						className="user-buttons"
						id="user-button-4"
						onClick={() => handleButtonClick("recommendations")}
					>
						<img
							src={counterstrike}
							alt="recommendations"
							className="user-buttons-img"
						/>
						Recommendations
					</button>
				</div>
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
					<GameListCategory
						games={currentGames || []}
						displayMode={displayMode}
						gamesRecoLength={gamesRecoLength}
						onLoadMore={() => setGamesRecoLength((prev) => prev + 10)}
					/>
				)}
			</section>
		</main>
	);
}

export default UserPage;

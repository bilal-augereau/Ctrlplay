import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useCallback, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import "./UserPage.css";

import type GameType from "../interface/GameType";
import type UserType from "../interface/UserType";

import GameCard from "../components/GameCard";
import GameRatings from "../components/GameComponents/GameRatings";
import Avatar from "../components/UserComponents/Avatar";
import Top3 from "../components/UserComponents/Top3";

import rezio from "../assets/images/avatar/avatarezio.png";
import scorpion from "../assets/images/avatar/avatarscorpion.png";
import spiderman from "../assets/images/avatar/avatarspider.png";

function UserPage() {
	const user = useLoaderData() as UserType;

	// TO DO : UPDATE WHEN CRITERIA FOR FEATURED GAMES DEFINED
	const gameFeaturedId = 33;
	const [displayMode, setDisplayMode] = useState<
		"recommendations" | "allGames" | "favorites" | "toDo"
	>("recommendations");
	const [userGames, setUserGames] = useState<GameType[]>([]);
	const [favoriteGames, setFavoriteGames] = useState<GameType[]>([]);
	const [toDoGames, setToDoGames] = useState<GameType[]>([]);

	const [gameFeatured, setGameFeatured] = useState<GameType>();
	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/games/${gameFeaturedId}`)
			.then((res) => res.json())
			.then((data) => setGameFeatured(data));
	}, []);

	function shortenDescription(description: string, maxChar: number) {
		if (description.length <= maxChar) return description;
		const shorten = description.slice(0, maxChar);
		return `${shorten.slice(0, shorten.lastIndexOf(" "))}...`;
	}

	let shortDescription = null;
	if (gameFeatured) {
		shortDescription = parse(
			DOMPurify.sanitize(shortenDescription(gameFeatured.description, 250), {
				USE_PROFILES: { html: true },
			}),
		);
	}

	const [gamesReco, setGamesReco] = useState<GameType[]>();
	useEffect(() => {
		if (user?.id)
			fetch(
				`${import.meta.env.VITE_API_URL}/api/users/${user.id}/recommandation`,
			)
				.then((res) => res.json())
				.then((data) => setGamesReco(data));
	}, [user?.id]);
	const [gamesRecoLength, setGamesRecoLength] = useState<number>(20);

	const loadUserGames = useCallback(async () => {
		if (!user?.id) {
			console.error("User not found.");
			return;
		}
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/users/${user.id}/games`,
			);
			const data = await response.json();

			if (data.error) {
				console.error("API error:", data.error);
				setUserGames([]);
				return;
			}

			setUserGames(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error loading user games:", error);
			setUserGames([]);
		}
	}, [user?.id]);

	const loadFavoriteGames = async () => {
		if (!user?.id) {
			console.error("User not found.");
			return;
		}
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/users/${user.id}/favorites`,
			);
			const data = await response.json();

			if (data.error) {
				console.error("API error:", data.error);
				setFavoriteGames([]);
				return;
			}

			setFavoriteGames(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error loading favorite games:", error);
			setFavoriteGames([]);
		}
	};

	const loadToDoGames = async () => {
		if (!user?.id) {
			console.error("User not found.");
			return;
		}
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/users/${user.id}/todo`,
			);
			const data = await response.json();

			if (data.error) {
				console.error("API error:", data.error);
				setToDoGames([]);
				return;
			}

			setToDoGames(Array.isArray(data) ? data : []);
		} catch (error) {
			console.error("Error loading to-do games:", error);
			setToDoGames([]);
		}
	};

	useEffect(() => {
		if (displayMode === "allGames") {
			loadUserGames();
		}
	}, [displayMode, loadUserGames]);

	const handleButtonClick = (
		mode: "recommendations" | "allGames" | "favorites" | "toDo",
	) => {
		setDisplayMode(mode);
		if (mode === "allGames") {
			loadUserGames();
		} else if (mode === "favorites") {
			loadFavoriteGames();
		} else if (mode === "toDo") {
			loadToDoGames();
		}
	};

	return (
		<main id="user-main">
			<aside id="user-aside">
				<section className="content-box" id="user-welcome-box">
					<div id="user-welcome">
						<Avatar avatar={user.avatar} />
						<h2>Welcome {user.pseudo}!</h2>
					</div>
					{user.topGames ? <Top3 topGames={user.topGames} /> : <></>}
				</section>
				<div>
					<h3>Featured game</h3>
					{gameFeatured ? (
						<section className="content-box" id="user-featured-game">
							<img
								id="user-game-banner"
								src={gameFeatured.image}
								alt={gameFeatured.title}
							/>
							<div id="user-game-details">
								<div>
									<h4>{gameFeatured?.title}</h4>
									<GameRatings note={gameFeatured.note} />
								</div>
								{shortDescription ? <p>{shortDescription}</p> : <></>}
								<Link
									to={`/game/${gameFeaturedId}`}
									className="beautiful-button user-beautiful-button"
								>
									Check this game
								</Link>
							</div>
						</section>
					) : (
						<></>
					)}
				</div>
			</aside>
			<section className="content-box" id="user-main-box">
				<h3>Search a game</h3>
				<p>Insérer ici le search bar d'Emilie</p>
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
				<article>
					{displayMode === "recommendations" && gamesReco ? (
						<div id="user-game-list">
							{gamesReco.slice(0, gamesRecoLength - 1).map((game: GameType) => (
								<GameCard game={game} key={game.id} />
							))}
						</div>
					) : displayMode === "allGames" ? (
						<div id="user-game-list">
							{userGames.map((game: GameType) => (
								<GameCard game={game} key={game.id} />
							))}
						</div>
					) : displayMode === "favorites" ? (
						<div id="user-game-list">
							{favoriteGames.length > 0 ? (
								favoriteGames.map((game: GameType) => (
									<GameCard game={game} key={game.id} />
								))
							) : (
								<p>No favorite games found.</p>
							)}
						</div>
					) : null}

					{displayMode === "recommendations" && (
						<button
							type="button"
							className="beautiful-button user-beautiful-button"
							onClick={() => setGamesRecoLength(gamesRecoLength + 10)}
						>
							More...
						</button>
					)}

					{displayMode === "toDo" ? (
						<div id="user-game-list">
							{toDoGames.length > 0 ? (
								toDoGames.map((game: GameType) => (
									<GameCard game={game} key={game.id} />
								))
							) : (
								<p>No games in to-do list.</p>
							)}
						</div>
					) : null}
				</article>
			</section>
		</main>
	);
}

export default UserPage;

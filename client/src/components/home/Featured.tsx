import { useEffect, useState } from "react";

import { useAuth } from "../../context/UserContext";

import FavoriteButton from "../buttons/FavoriteButton";
import GameShelfButton from "../buttons/GameShelfButton";
import InfosButton from "../buttons/InfosButton";
import GameDevices from "../game/GameDevices";

import type GameType from "../../interface/GameType";

import "./featured.css";

const Featured = () => {
	const [games, setGames] = useState<GameType[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPrimaryImage, setIsPrimaryImage] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const response = await fetch("http://localhost:3310/api/games");
				if (!response.ok) {
					throw new Error("Failed to fetch games");
				}
				const allGames = await response.json();
				const filteredGames = allGames.filter((game: GameType) =>
					[1, 16, 32, 66].includes(Number(game.id)),
				);
				setGames(filteredGames);
			} catch (error) {
				console.error("Error fetching games:", error);
			}
		};

		fetchGames();
	}, []);

	const handleNext = () => {
		if (games.length > 0) {
			setIsPrimaryImage(true);
			setCurrentIndex((prevIndex) =>
				prevIndex < games.length - 1 ? prevIndex + 1 : 0,
			);
		}
	};

	const handlePrevious = () => {
		if (games.length > 0) {
			setIsPrimaryImage(true);
			setCurrentIndex((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : games.length - 1,
			);
		}
	};

	const toggleImage = () => {
		setIsPrimaryImage(!isPrimaryImage);
	};

	const handleThumbnailClick = () => {
		setIsPrimaryImage(false);
	};

	return (
		<div className="content-box homepage-content-box" id="featured">
			<h2 className="featured-title">Featured Games</h2>
			<button
				type="button"
				className="arrow left"
				onClick={handlePrevious}
				aria-label="Previous"
			/>

			{games.length > 0 && (
				<>
					<div className="featured-card">
						<img
							src={
								isPrimaryImage
									? games[currentIndex].image
									: games[currentIndex].image_2
							}
							alt={games[currentIndex]?.title || "Game"}
							className="game-image"
							onClick={toggleImage}
							onKeyDown={toggleImage}
						/>
						<div className="thumb-text">
							<h3 className="game-name">{games[currentIndex]?.title}</h3>

							<div className="device-container">
								{Array.isArray(games[currentIndex]?.devices) ? (
									<GameDevices devices={games[currentIndex].devices} />
								) : typeof games[currentIndex]?.devices === "string" ? (
									<GameDevices
										devices={(games[currentIndex].devices as string)
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
								) : (
									<p>Devices: Unknown</p>
								)}
							</div>

							<p className="game-genres">
								{" "}
								{Array.isArray(games[currentIndex]?.genres)
									? games[currentIndex]?.genres.join(", ")
									: games[currentIndex]?.genres || "Unknown"}
							</p>

							<p className="game-tags">
								#{" "}
								{Array.isArray(games[currentIndex]?.tags)
									? games[currentIndex]?.tags.join(", ")
									: games[currentIndex]?.tags || "Unknown"}
							</p>

							<img
								src={
									isPrimaryImage
										? games[currentIndex].image_2
										: games[currentIndex].image
								}
								alt="Thumbnail"
								className="game-thumbnail"
								onClick={handleThumbnailClick}
								onKeyDown={handleThumbnailClick}
							/>
						</div>
					</div>

					<div className="game-actions">
						<InfosButton id={games[currentIndex].id} />
						{user ? (
							<>
								<GameShelfButton
									userId={user.id}
									gameId={Number.parseInt(games[currentIndex].id)}
								/>
								<FavoriteButton
									userId={user.id}
									gameId={Number.parseInt(games[currentIndex].id)}
								/>
							</>
						) : (
							<></>
						)}
					</div>
				</>
			)}

			<button
				type="button"
				className="arrow right"
				onClick={handleNext}
				aria-label="Next"
			/>
		</div>
	);
};

export default Featured;

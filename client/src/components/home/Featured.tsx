import { useEffect, useState } from "react";
import type GameType from "../../interface/GameType";
import "./featured.css";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useAuth } from "../../context/UserContext";

import GameButtons from "../buttons/GameButtons";
import GameDevices from "../game/GameDevices";

const Featured = () => {
	const [games, setGames] = useState<GameType[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPrimaryImage, setIsPrimaryImage] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const response = await fetch(
					"http://localhost:3310/api/games/featured/today",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch games");
				}
				const featuredGames = await response.json();
				setGames(featuredGames);
			} catch (error) {
				console.error("Error fetching games:", error);
			}
		};

		fetchGames();
	}, []);

	const shortenDescription = (game: GameType) => {
		const shortDescription = parse(
			DOMPurify.sanitize(
				game.description.length <= 200
					? game.description
					: `${game.description.slice(0, game.description.slice(0, 200).lastIndexOf(" "))}...`,
				{
					USE_PROFILES: { html: true },
				},
			),
		);
		return shortDescription;
	};

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
		<div className="content-box" id="featured">
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
								{Array.isArray(games[currentIndex]?.genres)
									? games[currentIndex]?.genres.join(", ")
									: games[currentIndex]?.genres || "Unknown"}
							</p>

							<p className="short-description">
								{shortenDescription(games[currentIndex]) && (
									<p>{shortenDescription(games[currentIndex])}</p>
								)}
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
					<GameButtons userId={user?.id} game={games[currentIndex]} />
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

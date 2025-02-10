import { useEffect, useState } from "react";
import type GameType from "../interface/GameType";

const API_GAMES = "https://api.example.com/games"; // List of all games
const API_USER_GAMES = "https://api.example.com/user/games"; // User's games (IDs only)

const useSteamAPI = (userId: string) => {
	const [games, setGames] = useState<{ id: string; name: string }[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				setLoading(true);

				// Fetch both APIs in parallel
				const [allGamesRes, userGamesRes] = await Promise.all([
					fetch(API_GAMES),
					fetch(`${API_USER_GAMES}/${userId}`),
				]);

				if (!allGamesRes.ok || !userGamesRes.ok) {
					throw new Error("Failed to fetch data");
				}

				// Convert responses to JSON
				const allGames = await allGamesRes.json(); // [{ id: 1, name: "Zelda" }, { id: 2, name: "Mario" }]
				const userGames = await userGamesRes.json(); // [{ id: 1 }, { id: 3 }]

				// Merge: Find only games the user owns
				const mergedGames = allGames.filter((game: GameType) =>
					userGames.some((userGame: GameType) => userGame.id === game.id),
				);

				setGames(mergedGames);
			} catch (err) {
				setError("Error fetching games.");
			} finally {
				setLoading(false);
			}
		};

		if (userId) fetchGames();
	}, [userId]);

	return { games, loading, error };
};

export default useSteamAPI;

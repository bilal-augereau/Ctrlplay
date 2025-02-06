import { useCallback, useState } from "react";

import type DisplayModeCategory from "../interface/GameCategoryType";
import type GameType from "../interface/GameType";

export const useGames = (userId: number, userToken: string) => {
	const [games, setGames] = useState<{
		userGames: GameType[];
		favoriteGames: GameType[];
		wishlistGames: GameType[];
		recommendedGames?: GameType[];
	}>({
		userGames: [],
		favoriteGames: [],
		wishlistGames: [],
		recommendedGames: undefined,
	});

	const loadGames = useCallback(
		async (mode: DisplayModeCategory) => {
			if (!userId) {
				console.error("User not found.");
				return;
			}

			const endpoints: Record<DisplayModeCategory, string> = {
				allGames: "games",
				favorites: "favorites",
				wishlist: "wishlist",
				recommendations: "recommandation",
			};

			try {
				const apiUrl = `${import.meta.env.VITE_API_URL}/api/users/${userId}/${endpoints[mode]}`;
				const response = await fetch(apiUrl, {
					headers: { Authorization: userToken },
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const gamesData = await response.json();

				if (gamesData.error) {
					console.error(`API error for ${mode}:`, gamesData.error);
					return;
				}

				setGames((prev) => ({
					...prev,
					[mode === "allGames"
						? "userGames"
						: mode === "favorites"
							? "favoriteGames"
							: mode === "wishlist"
								? "wishlistGames"
								: "recommendedGames"]: Array.isArray(gamesData)
						? gamesData
						: [],
				}));
			} catch (error) {
				console.error(`Error loading ${mode} games:`, error);
			}
		},
		[userId, userToken],
	);

	return { games, loadGames };
};

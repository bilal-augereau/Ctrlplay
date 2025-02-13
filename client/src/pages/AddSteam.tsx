import { useState } from "react";
import { toast } from "react-toastify";

import type { FormEventHandler } from "react";

import GameCard from "../components/game/GameCard";

import type GameType from "../interface/GameType";

import steam from "../assets/images/steam-logo.jpg";

import "./AddSteam.css";

function AddSteam() {
	const [steamUserId, setSteamUserId] = useState<string>("");
	const [games, setGames] = useState<GameType[]>([]);

	const isValidSteamId = (id: string) => {
		return /^\d+$/.test(id);
	};

	const handleSteamId: FormEventHandler = async (event) => {
		event.preventDefault();

		if (!steamUserId || !isValidSteamId(steamUserId)) {
			toast.error("Please enter a valid Steam ID.");
			return;
		}

		try {
			const queryParams = new URLSearchParams({
				steamUserId: steamUserId,
			});

			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/games/platforms/steam?${queryParams}`,
				{
					headers: { "Content-Type": "application/json" },
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`API error: ${errorText}`);
			}

			const data = await response.json();
			setGames(data);
		} catch (err) {
			console.error("Fetch error:", err);
			toast.error("Error: Unable to connect to the server");
		}
	};

	// const addAllGames = async () => {
	//   if (games && games.length > 0)
	//     try {
	//   const response = await fetch (`${import.meta.env.VITE_API_URL}/api/`
	//   }
	// }

	return (
		<main id="steam-main">
			<section className="content-box" id="steam-section">
				<h1>
					<img src={steam} alt="Steam Logo" />
					Add your steam games
				</h1>
				<div>
					<p id="steam-introduction">
						Got hundreds of games on Steam and don’t want to search for them
						manually? <br /> Just enter your Steam ID, and we’ll find them for
						you. You can then choose to add them individually or all at once.
					</p>
					<p id="steam-explanation">
						Your steam games must be public for us to found them. <br />
						Rest assured, your Steam ID won’t be stored—it’s only used this one
						time to fetch your games and is immediately deleted from our system.
					</p>
				</div>

				<form onSubmit={handleSteamId}>
					<input
						type="text"
						id="steam-id"
						name="steamId"
						value={steamUserId}
						onChange={(event) => setSteamUserId(event.target.value)}
						placeholder="Enter your Steam ID"
						className="game-tag"
					/>
					<button type="submit" className="steam-buttons">
						Show me my Steam games
					</button>
				</form>
				<header>
					<h3>Your steam games</h3>
					<button
						type="button"
						className="steam-buttons"
						//onClick={addAllGames}
					>
						Add everything to my Gameshelf
					</button>
				</header>
				<div id="steam-game-list">
					{games?.map((game) => (
						<GameCard game={game} key={game.id} />
					))}
				</div>
			</section>
		</main>
	);
}

export default AddSteam;

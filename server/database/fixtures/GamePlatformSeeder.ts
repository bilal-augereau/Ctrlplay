import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";
import GameSeeder from "./GameSeeder";
import PlatformSeeder from "./PlatformSeeder";

class GamePlatformSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "game_platform",
			truncate: true,
			dependencies: [GameSeeder, PlatformSeeder],
		});
	}

	run() {
		for (const game of games) {
			const gameId = game.id;

			if (game.platform_id.steam !== null) {
				const steamPairing: {
					game_id: number;
					platform_id: number;
					game_platform_id: number;
				} = {
					game_id: this.getRef(`game_${gameId}`).insertId,
					platform_id: this.getRef("platform_1").insertId,
					game_platform_id: game.platform_id.steam,
				};

				this.insert(steamPairing);
			}
		}
	}
}

export default GamePlatformSeeder;

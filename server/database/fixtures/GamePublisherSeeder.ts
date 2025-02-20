import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";
import GameSeeder from "./GameSeeder";
import PublisherSeeder from "./PublisherSeeder";

class GamePublisherSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "game_publisher",
			truncate: true,
			dependencies: [GameSeeder, PublisherSeeder],
		});
	}

	run() {
		const insertedPairs = new Set<string>();

		for (const game of games) {
			const gameId = game.id;

			for (const publisher of game.publishers) {
				const publisherId = publisher.id;
				const pairKey = `${gameId}_${publisherId}`;

				if (!insertedPairs.has(pairKey)) {
					insertedPairs.add(pairKey);

					const newPairing: {
						game_id: number;
						publisher_id: number;
					} = {
						game_id: this.getRef(`game_${gameId}`).insertId,
						publisher_id: this.getRef(`publisher_${publisherId}`).insertId,
					};

					this.insert(newPairing);
				}
			}
		}
	}
}

export default GamePublisherSeeder;

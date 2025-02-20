import AbstractSeeder from "./AbstractSeeder";
import GameSeeder from "./GameSeeder";
import UserSeeder from "./UserSeeder";

import games from "../gameDetails.json";

class WishlistSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "wishlist",
			truncate: true,
			dependencies: [GameSeeder, UserSeeder],
		});
	}

	run() {
		const games_id = games.map((game) => game.id);
		const insertedPairs = new Set<string>();

		for (let i = 0; i < 50; i++) {
			const user_id = Math.floor(Math.random() * 10);
			const game_id = games_id[Math.floor(Math.random() * games_id.length)];
			const pairKey = `${user_id}_${game_id}`;

			if (!insertedPairs.has(pairKey)) {
				insertedPairs.add(pairKey);

				const fakeWishlist = {
					user_id: this.getRef(`user_${user_id}`).insertId,
					game_id: this.getRef(`game_${game_id}`).insertId,
					refName: `${user_id}_${game_id}`,
				};

				this.insert(fakeWishlist);
			}
		}
	}
}

export default WishlistSeeder;

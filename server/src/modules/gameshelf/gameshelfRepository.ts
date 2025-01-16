import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class gameShelfRepository {
	async readAllByUser(id: number) {
		const [games] = await databaseClient.query<Rows>(
			"SELECT * FROM game JOIN game_shelf AS gs ON gs.game_id = game.id WHERE gs.user_id = ?",
			[id],
		);

		return games;
	}

	async readFavoritesByUser(id: number) {
		const [games] = await databaseClient.query<Rows>(
			"SELECT * FROM game JOIN game_shelf AS gs ON gs.game_id = game.id WHERE gs.user_id = ? AND gs.favorite = 1",
			[id],
		);

		return games;
	}
}

export default new gameShelfRepository();

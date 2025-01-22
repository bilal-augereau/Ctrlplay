import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class gameShelfRepository {
	async create(userId: number, gameId: number) {
		await databaseClient.query<Rows>(
			`INSERT INTO game_shelf (user_id, game_id)
       VALUES (?, ?)`,
			[userId, gameId],
		);
	}

	async delete(userId: number, gameId: number) {
		await databaseClient.query<Rows>(
			"DELETE FROM game_shelf WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
	}

	async exists(userId: number, gameId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT 1 FROM game_shelf WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
		return rows.length > 0;
	}

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

	async readTop3TimeSpent(id: number) {
		const [games] = await databaseClient.query<Rows>(
			"SELECT * FROM game JOIN game_shelf AS gs ON gs.game_id = game.id WHERE gs.user_id = ? ORDER BY time_spent DESC LIMIT 3",
			[id],
		);

		return games;
	}
}

export default new gameShelfRepository();

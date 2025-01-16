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
	async exists(userId: number, gameId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT 1 FROM game_shelf WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
		return rows.length > 0;
	}
	async delete(userId: number, gameId: number) {
		await databaseClient.query<Rows>(
			"DELETE FROM game_shelf WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
	}
}

export default new gameShelfRepository();

import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class gameShelfRepository {
	async create(userId: number, gameId: number): Promise<void> {
		await databaseClient.query(
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
	async favorite(
		userId: number,
		gameId: number,
		favorite: boolean,
	): Promise<void> {
		await databaseClient.query(
			`UPDATE game_shelf
	   SET favorite = ?
	   WHERE user_id = ? AND game_id = ?`,
			[favorite ? 1 : 0, userId, gameId],
		);
	}
}

export default new gameShelfRepository();

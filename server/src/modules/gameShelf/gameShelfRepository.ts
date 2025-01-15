import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type UserGame = {
	gameId: number;
	userId: number;
};
class gameShelfRepository {
	async create(userGame: UserGame): Promise<void> {
		const { userId, gameId } = userGame;

		const [user] = await databaseClient.query(
			"SELECT id FROM user WHERE id = ?",
			[userId],
		);

		const [game] = await databaseClient.query(
			"SELECT id FROM game WHERE id = ?",
			[gameId],
		);

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
}

export default new gameShelfRepository();

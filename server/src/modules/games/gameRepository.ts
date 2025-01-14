import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type UserGame = {
	gameId: number;
	userId: number;
};

class GameRepository {
	async createUserGameLibrary(userGame: UserGame): Promise<void> {
		const { userId, gameId } = userGame;

		const [user] = await databaseClient.query(
			"SELECT id FROM user WHERE id = ?",
			[userId],
		);
		if (!user) {
			throw new Error("User not found.");
		}

		const [game] = await databaseClient.query(
			"SELECT id FROM game WHERE id = ?",
			[gameId],
		);
		if (!game) {
			throw new Error("Game not found.");
		}

		await databaseClient.query(
			`INSERT INTO game_shelf (user_id, game_id)
       VALUES (?, ?)`,
			[userId, gameId],
		);
	}
}

export default new GameRepository();

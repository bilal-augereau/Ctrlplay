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

	async isFavorite(userId: number, gameId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT 1 FROM game_shelf WHERE user_id = ? AND game_id = ? AND favorite = 1",
			[userId, gameId],
		);
		return rows.length > 0;
	}

	async readAllByUser(userId: number, order?: string, limit?: number) {
		const queries = [];
		const values: (string | number)[] = [userId];
		if (order) {
			values.push(order);
			queries.push("ORDER BY ?");
		}
		if (limit) {
			values.push(limit);
			queries.push("LIMIT ?");
		}

		const clauses = queries.length > 0 ? `${queries.join(" ")}` : "";

		const [games] = await databaseClient.query<Rows>(
			`SELECT * FROM game JOIN game_shelf AS gs ON gs.game_id = game.id WHERE gs.user_id = ? ${clauses}`,
			values,
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

	async updateFavorite(
		userId: number,
		gameId: number,
		isFavorite: boolean,
	): Promise<void> {
		await databaseClient.query(
			`UPDATE game_shelf
				SET favorite = ?
				WHERE user_id = ? AND game_id = ?`,
			[isFavorite ? 0 : 1, userId, gameId],
		);
	}
}

export default new gameShelfRepository();

import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type GameShelfType from "../../interface/GameShelfType";
import type GameType from "../../interface/GameType";

class wishlistRepository {
	async create(userId: number, gameId: number) {
		await databaseClient.query<Rows>(
			`INSERT INTO wishlist (user_id, game_id)
       VALUES (?, ?)`,
			[userId, gameId],
		);
	}

	async delete(userId: number, gameId: number) {
		await databaseClient.query<Rows>(
			"DELETE FROM wishlist WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
	}

	async read(userId: number, gameId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM wishlist WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
		return rows as GameShelfType[];
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
			`SELECT g.*, 
			GROUP_CONCAT(DISTINCT ge.name ORDER BY ge.name SEPARATOR ', ') AS genres, 
			GROUP_CONCAT(DISTINCT d.name ORDER BY FIELD(d.name, 'Others'), d.name SEPARATOR ', ') AS devices, 
			GROUP_CONCAT(DISTINCT tag.name ORDER BY tag.name SEPARATOR ', ') AS tags, 
			GROUP_CONCAT(DISTINCT publisher.name ORDER BY publisher.name SEPARATOR ', ') AS publishers
		FROM game g 
		LEFT JOIN game_genre AS gg ON gg.game_id = g.id 
		LEFT JOIN genre ge ON gg.genre_id = ge.id 
		LEFT JOIN game_device AS gd ON gd.game_id = g.id 
		LEFT JOIN device d ON gd.device_id = d.id 
		LEFT JOIN game_tag AS gt ON gt.game_id = g.id 
		LEFT JOIN tag ON gt.tag_id = tag.id 
		LEFT JOIN game_publisher AS gp ON gp.game_id = g.id 
		LEFT JOIN publisher ON gp.publisher_id = publisher.id 
		LEFT JOIN wishlist w ON w.game_id = g.id 
		WHERE w.user_id = ? 
		GROUP BY g.id
        ${clauses}`,
			values,
		);
		return games as GameType[];
	}
}

export default new wishlistRepository();

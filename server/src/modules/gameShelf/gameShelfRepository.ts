import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type GameShelfType from "../../interface/GameShelfType";
import type GameType from "../../interface/GameType";

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

	async read(userId: number, gameId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT * FROM game_shelf WHERE user_id = ? AND game_id = ?",
			[userId, gameId],
		);
		return rows as GameShelfType[];
	}

	async isToDo(userId: number, gameId: number) {
		const [rows] = await databaseClient.query<Rows>(
			"SELECT 1 FROM game_shelf WHERE user_id = ? AND game_id = ? AND to_do = 1",
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
		LEFT JOIN game_shelf gs ON gs.game_id = g.id 
		WHERE gs.user_id = ? 
		GROUP BY g.id
        ${clauses}`,
			values,
		);
		return games as GameType[];
	}

	async readFavoritesByUser(userId: number, order?: string, limit?: number) {
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
        LEFT JOIN game_shelf gs ON gs.game_id = g.id 
        WHERE gs.user_id = ? AND gs.favorite = 1
        GROUP BY g.id
        ${clauses}`,
			values,
		);

		return games as GameType[];
	}

	async readToDoByUser(userId: number, order?: string, limit?: number) {
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
        LEFT JOIN game_shelf gs ON gs.game_id = g.id 
        WHERE gs.user_id = ? AND gs.to_do = 1
        GROUP BY g.id
        ${clauses}`,
			values,
		);

		return games as GameType[];
	}

	async readFeaturedGames() {
		const [games] = await databaseClient.query<Rows>(
			"WITH filtered_games AS (SELECT game_id, COUNT(*) AS number_add FROM game_shelf GROUP BY game_id ORDER BY number_add DESC LIMIT 5) SELECT filtered_games.*, g.*, GROUP_CONCAT(DISTINCT ge.name ORDER BY ge.name SEPARATOR ', ') AS genres, GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS devices, GROUP_CONCAT(DISTINCT tag.name ORDER BY tag.name SEPARATOR ', ') AS tags, GROUP_CONCAT(DISTINCT publisher.name ORDER BY publisher.name SEPARATOR ', ') AS publishers FROM filtered_games JOIN game AS g ON g.id = filtered_games.game_id LEFT JOIN game_genre AS gg ON gg.game_id = g.id LEFT JOIN genre ge ON gg.genre_id = ge.id LEFT JOIN game_device AS gd ON gd.game_id = g.id LEFT JOIN device d ON gd.device_id = d.id LEFT JOIN game_tag AS gt ON gt.game_id = g.id LEFT JOIN tag ON gt.tag_id = tag.id LEFT JOIN game_publisher AS gp ON gp.game_id = g.id LEFT JOIN publisher ON gp.publisher_id = publisher.id GROUP BY g.id",
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
			[isFavorite ? 1 : 0, userId, gameId],
		);
	}

	async updateToDo(
		userId: number,
		gameId: number,
		isToDo: boolean,
	): Promise<void> {
		await databaseClient.query(
			`UPDATE game_shelf
				SET to_do = ?
				WHERE user_id = ? AND game_id = ?`,
			[isToDo ? 0 : 1, userId, gameId],
		);
	}
	async updateTimeSpent(
		userId: number,
		gameId: number,
		timeSpent: number,
	): Promise<void> {
		const query =
			"UPDATE game_shelf SET time_spent = ? WHERE user_id = ? AND game_id = ?";
		await databaseClient.query(query, [timeSpent, userId, gameId]);
	}
}

export default new gameShelfRepository();

import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";

const commentRepository = {
	readAllByGameId: async (gameId: number) => {
		const sql = `
              SELECT c.id, c.content, c.rating, c.created_at, u.pseudo, u.avatar, u.id as user_id
            FROM comment c
            JOIN user u ON c.user_id = u.id
            WHERE c.game_id = ?
            ORDER BY c.created_at DESC;
        `;
		const [results] = await databaseClient.query(sql, [gameId]);
		return results;
	},

	add: async (
		userId: number,
		gameId: number,
		content: string,
		rating: number,
	) => {
		const sql =
			"INSERT INTO comment (user_id, game_id, content, rating) VALUES (?, ?, ?, ?)";
		const [result] = await databaseClient.query<ResultSetHeader>(sql, [
			userId,
			gameId,
			content,
			rating,
		]);

		await commentRepository.updateGameRating(gameId);

		return {
			id: result.insertId,
			userId,
			gameId,
			content,
			rating,
			created_at: new Date(),
		};
	},

	remove: async (commentId: number, gameId: number) => {
		const sql = "DELETE FROM comment WHERE id = ?";
		const [result] = await databaseClient.query<ResultSetHeader>(sql, [
			commentId,
		]);

		await commentRepository.updateGameRating(gameId);

		return result.affectedRows > 0;
	},

	updateGameRating: async (gameId: number) => {
		const sql = `
            UPDATE game 
            SET note = (SELECT AVG(rating) FROM comment WHERE game_id = ? AND rating IS NOT NULL) 
            WHERE id = ?;
        `;
		await databaseClient.query(sql, [gameId, gameId]);
	},

	getAverageRating: async (gameId: number) => {
		const sql = `
			SELECT AVG(rating) AS averageRating 
			FROM comment 
			WHERE game_id = ? AND rating IS NOT NULL;
		`;

		const [rows] = await databaseClient.query<RowDataPacket[]>(sql, [gameId]);

		return rows.length > 0 && rows[0].averageRating !== null
			? rows[0].averageRating
			: null;
	},
};

export default commentRepository;

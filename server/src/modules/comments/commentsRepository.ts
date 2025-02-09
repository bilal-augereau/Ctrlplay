import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";

const commentRepository = {
	readAllByGameId: async (gameId: number) => {
		const sql = `
              SELECT c.id, c.content, c.created_at, u.pseudo, u.avatar, u.id as user_id
            FROM comment c
            JOIN user u ON c.user_id = u.id
            WHERE c.game_id = ?
            ORDER BY c.created_at DESC;
        `;
		const [results] = await databaseClient.query(sql, [gameId]);
		return results;
	},

	add: async (userId: number, gameId: number, content: string) => {
		const sql =
			"INSERT INTO comment (user_id, game_id, content) VALUES (?, ?, ?)";
		const [result] = await databaseClient.query<ResultSetHeader>(sql, [
			userId,
			gameId,
			content,
		]);
		return {
			id: result.insertId,
			userId,
			gameId,
			content,
			created_at: new Date(),
		};
	},

	remove: async (commentId: number) => {
		const sql = "DELETE FROM comment WHERE id = ?";
		const [result] = await databaseClient.query<ResultSetHeader>(sql, [
			commentId,
		]);
		return result.affectedRows > 0;
	},
};

export default commentRepository;

import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class UserRepository {
	async read(id: number) {
		const [[user]] = await databaseClient.query<Rows>(
			"SELECT * FROM user WHERE user.id = ?",
			[id],
		);

		return user;
	}

	async add(
		pseudo: string,
		password: string,
		avatar: string,
	): Promise<{ insertId: number }> {
		const [result] = await databaseClient.query<ResultSetHeader>(
			"INSERT INTO user (pseudo, password, avatar) VALUES (?, ?, ?)",
			[pseudo, password, avatar],
		);

		return result;
	}

	async readByPseudo(pseudo: string) {
		const [[user]] = await databaseClient.query<Rows>(
			"SELECT * FROM user WHERE user.pseudo = ?",
			[pseudo],
		);

		return user;
	}

	async update(avatar: string, userId: number) {
		await databaseClient.query<Rows>(
			"UPDATE user SET avatar = ? WHERE id = ?",
			[avatar, userId],
		);
	}
}

export default new UserRepository();

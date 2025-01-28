import type { ResultSetHeader } from "mysql2";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type InsertResult = {
	insertId: number;
	affectedRows: number;
	warningStatus: number;
};

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
}

export default new UserRepository();

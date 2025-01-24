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
}

export default new UserRepository();

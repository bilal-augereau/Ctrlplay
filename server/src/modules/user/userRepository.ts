import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class userRepository {
	async read(id: number) {
		const [[user]] = await databaseClient.query<Rows>(
			"SELECT pseudo, avatar FROM user WHERE user.id = ?",
			[id],
		);

		return user;
	}
}

export default new userRepository();

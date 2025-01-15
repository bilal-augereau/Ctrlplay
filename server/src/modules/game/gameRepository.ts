import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class gameRepository {
	async read(id: number) {
		const [[game]] = await DatabaseClient.query<Rows>(
			"SELECT * FROM game WHERE game.id = ?",
			[id],
		);

		return game;
	}
}

export default new gameRepository();

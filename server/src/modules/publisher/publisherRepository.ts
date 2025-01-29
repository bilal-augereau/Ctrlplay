import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class PublisherRepository {
	async readAllByGameId(id: number) {
		const [publishers] = await databaseClient.query<Rows>(
			"SELECT name FROM publisher JOIN game_publisher AS gp ON gp.publisher_id = publisher.id JOIN game ON gp.game_id = game.id WHERE game.id = ?",
			[id],
		);

		return publishers.map((publisher) => publisher.name);
	}

	async readAll() {
		const [publishers] = await databaseClient.query<Rows>(
			"SELECT name FROM publisher",
		);

		return publishers.map((publisher) => publisher.name);
	}
}

export default new PublisherRepository();

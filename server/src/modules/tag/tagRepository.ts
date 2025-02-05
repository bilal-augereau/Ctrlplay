import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class TagRepository {
	async readAllByGameId(id: number) {
		const [tags] = await DatabaseClient.query<Rows>(
			"SELECT name FROM tag JOIN game_tag AS gt ON gt.tag_id = tag.id JOIN game ON gt.game_id = game.id WHERE game.id = ?",
			[id],
		);

		return tags.map((tag) => tag.name.replaceAll(" ", "").toLowerCase());
	}

	async readAll() {
		const [tags] = await DatabaseClient.query<Rows>("SELECT name FROM tag");

		return tags.map((tag) => tag.name);
	}

	async readAllbyUserId(userId: number) {
		const [tags] = await DatabaseClient.query<Rows>(
			"SELECT name FROM tag JOIN game_tag gt ON gt.tag_id = tag.id JOIN game ON gt.game_id = game.id JOIN game_shelf gs ON gs.game_id = game.id WHERE gs.user_id = ? GROUP BY tag.name",
			[userId],
		);

		return tags.map((tag) => tag.name);
	}
}

export default new TagRepository();

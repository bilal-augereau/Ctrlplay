import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class GenreRepository {
	async readAllByGameId(id: number) {
		const [genres] = await DatabaseClient.query<Rows>(
			"SELECT name FROM genre JOIN game_genre AS gg ON gg.genre_id = genre.id JOIN game ON gg.game_id = game.id WHERE game.id = ?",
			[id],
		);

		return genres.map((genre) => genre.name);
	}

	async readAllbyUserId(userId: number) {
		const [genres] = await DatabaseClient.query<Rows>(
			"SELECT name FROM genre JOIN game_genre gg ON gg.genre_id = genre.id JOIN game ON gg.game_id = game.id JOIN game_shelf gs ON gs.game_id = game.id WHERE gs.user_id = ? GROUP BY genre.name",
			[userId],
		);

		return genres.map((genre) => genre.name);
	}
}

export default new GenreRepository();

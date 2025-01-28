import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class GenreRepository {
	async readAllByGameId(id: number) {
		const [genres] = await databaseClient.query<Rows>(
			"SELECT name FROM genre JOIN game_genre AS gg ON gg.genre_id = genre.id JOIN game ON gg.game_id = game.id WHERE game.id = ?",
			[id],
		);

		return genres.map((genre) => genre.name);
	}

	async readAll() {
		const [genres] = await databaseClient.query<Rows>("SELECT name FROM genre");

		return genres.map((genre) => genre.name);
	}
}

export default new GenreRepository();

import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

import type ScoredProperties from "../../interface/ScoredProperties";

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

	async readAllbyUserId(userId: number) {
		const [genres] = await databaseClient.query<Rows>(
			"SELECT name, (SUM(CASE WHEN favorite = 1 THEN 2 ELSE 1 END)) AS score FROM genre JOIN game_genre gg ON gg.genre_id = genre.id JOIN game ON gg.game_id = game.id JOIN game_shelf gs ON gs.game_id = game.id WHERE gs.user_id = ? GROUP BY genre.name",
			[userId],
		);
		return genres as ScoredProperties[];
	}
}

export default new GenreRepository();

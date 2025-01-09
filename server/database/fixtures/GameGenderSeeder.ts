import AbstractSeeder from "./AbstractSeeder";
import games from "../gameDetails.json";
import GameSeeder from "./GameSeeder";
import GenreSeeder from "./GenreSeeder";

class GameGenreSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "game_genre",
      truncate: true,
      dependencies: [GameSeeder, GenreSeeder],
    });
  }

  run() {
    const insertedPairs = new Set<string>();

    for (const game of games) {
      const gameId = game.id;

      for (const genre of game.genres) {
        const genreId = genre.id;
        const pairKey = `${gameId}_${genreId}`;

        if (!insertedPairs.has(pairKey)) {
          insertedPairs.add(pairKey);
          const newPairing: {
            game_id: number;
            genre_id: number;
            refName: string;
          } = {
            game_id: gameId,
            genre_id: genreId,
            refName: `${pairKey}`,
          };
          this.insert(newPairing);
        }
      }
    }
  }
}

export default GameGenreSeeder;

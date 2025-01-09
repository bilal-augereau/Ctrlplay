import AbstractSeeder from "./AbstractSeeder";
import games from "../gameDetails.json";

class GenreSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "genre",
      truncate: true,
    });
  }

  run() {
    const genres = [];
    const genreIds = new Set();

    for (const game of games) {
      for (const genre of game.genres) {
        if (!genreIds.has(genre.id)) {
          genreIds.add(genre.id);
          const newGenre = {
            name: genre.name,
            refName: `genre_${genre.id}`,
          };
          this.insert(newGenre);
        }
      }
    }
  }
}

export default GenreSeeder;

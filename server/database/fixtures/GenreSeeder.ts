import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";

class GenreSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "genre",
      truncate: true,
    });
  }

  run() {
    const genreIds = new Set();

    for (const game of games) {
      for (const genre of game.genres) {
        if (!genreIds.has(genre.id)) {
          genreIds.add(genre.id);
          const newGenre = {
            id: genre.id,
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

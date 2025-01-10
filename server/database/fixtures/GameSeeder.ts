import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";

class GameSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "game", truncate: true });
  }

  run() {
    for (const game of games) {
      const released_date = new Date(game.released);

      const newGame = {
        title: game.name,
        year: released_date.getFullYear(),
        description: game.description,
        image: game.background_image,
        image_2: game.background_image_additional,
        note: game.rating,
        refName: `game_${game.id}`,
      };

      this.insert(newGame);
    }
  }
}

// Export the UserSeeder class
export default GameSeeder;

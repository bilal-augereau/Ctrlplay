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
        id: game.id,
        title: game.name,
        year: released_date.getFullYear(),
        description: game.description,
        refName: `game_${game.id}`,
      };

      this.insert(newGame);
    }
  }
}

// Export the UserSeeder class
export default GameSeeder;

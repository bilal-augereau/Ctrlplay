import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";
import GameSeeder from "./GameSeeder";
import TagSeeder from "./TagSeeder";

class GameTagSeeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "game_tag",
      truncate: true,
      dependencies: [GameSeeder, TagSeeder],
    });
  }

  run() {
    const insertedPairs = new Set<string>();

    for (const game of games) {
      const gameId = game.id;

      for (const tag of game.tags) {
        const tagId = tag.id;
        const pairKey = `${gameId}_${tagId}`;

        if (!insertedPairs.has(pairKey)) {
          insertedPairs.add(pairKey);

          const newPairing: {
            game_id: number;
            tag_id: number;
          } = {
            game_id: this.getRef(`game_${gameId}`).insertId,
            tag_id: this.getRef(`tag_${tagId}`).insertId,
          };

          this.insert(newPairing);
        }
      }
    }
  }
}

export default GameTagSeeeder;

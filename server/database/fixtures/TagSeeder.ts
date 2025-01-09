import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";

class TagSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "tag", truncate: true });
  }

  run() {
    const tag = [];
    const tagsId = new Set();

    for (const game of games) {
      for (const tag of game.tags) {
        if (!tagsId.has(tag.id)) {
          tagsId.add(tag.id);
          const tagGame = {
            name: tag.name,
            refName: `tag_${tag.id}`,
          };
          this.insert(tagGame);
        }
      }
    }
  }
}

export default TagSeeder;

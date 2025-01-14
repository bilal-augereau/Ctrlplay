import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";

class PublisherSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "publisher",
      truncate: true,
    });
  }

  run() {
    const publisherIds = new Set();

    for (const game of games) {
      for (const publisher of game.publishers) {
        if (!publisherIds.has(publisher.id)) {
          publisherIds.add(publisher.id);
          const newPublisher = {
            name: publisher.name,
            refName: `publisher_${publisher.id}`,
          };
          this.insert(newPublisher);
        }
      }
    }
  }
}

export default PublisherSeeder;

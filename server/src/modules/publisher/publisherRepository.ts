import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class publisherRepository {
  async readAllByGameId(id: number) {
    const [publishers] = await DatabaseClient.query<Rows>(
      "SELECT name FROM publisher JOIN game_publisher AS gp ON gp.publisher_id = publisher.id JOIN game ON gp.game_id = game.id WHERE game.id = ?",
      [id],
    );

    return publishers.map((publisher) => publisher.name);
  }
}

export default new publisherRepository();

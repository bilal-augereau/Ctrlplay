import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class tagRepository {
  async readAllByGameId(id: number) {
    const [tags] = await DatabaseClient.query<Rows>(
      "SELECT name FROM tag JOIN game_tag AS gt ON gt.tag_id = tag.id JOIN game ON gt.game_id = game.id WHERE game.id = ?",
      [id],
    );

    return tags.map((tag) => tag.name.replaceAll(" ", "").toLowerCase());
  }
}

export default new tagRepository();

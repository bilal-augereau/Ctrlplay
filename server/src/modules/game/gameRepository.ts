import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
import type GameType from "../../interface/GameType";
class gameRepository {
  async readAll(
    filters: {
      genre?: string;
      device?: string;
      tag?: string;
      publisher?: string;
    } = {},
  ) {
    const conditions: string[] = [];
    const values: (string | number)[] = [];
    if (filters.genre) {
      conditions.push("genres LIKE ?");
      values.push(`%${filters.genre}%`);
    }
    if (filters.device) {
      conditions.push("devices LIKE ?");
      values.push(`%${filters.device}%`);
    }
    if (filters.tag) {
      conditions.push("tags LIKE ?");
      values.push(`%${filters.tag}%`);
    }
    if (filters.publisher) {
      conditions.push("publishers LIKE ?");
      values.push(`%${filters.publisher}%`);
    }
    const HavingClause =
      conditions.length > 0 ? `HAVING (${conditions.join(" AND ")})` : "";
    const query = `
        SELECT g.*, GROUP_CONCAT(DISTINCT ge.name ORDER BY ge.name SEPARATOR ', ') AS genres, GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS devices, GROUP_CONCAT(DISTINCT tag.name ORDER BY tag.name SEPARATOR ', ') AS tags, GROUP_CONCAT(DISTINCT publisher.name ORDER BY publisher.name SEPARATOR ', ') AS publishers
        FROM game g
        LEFT JOIN game_genre AS gg ON gg.game_id = g.id
        LEFT JOIN genre ge ON gg.genre_id = ge.id
        LEFT JOIN game_device AS gd ON gd.game_id = g.id
        LEFT JOIN device d ON gd.device_id = d.id
        LEFT JOIN game_tag AS gt ON gt.game_id = g.id
        LEFT JOIN tag ON gt.game_id = tag.id
        LEFT JOIN game_publisher AS gp ON gp.game_id = g.id
        LEFT JOIN publisher ON gp.game_id = publisher.id
        GROUP BY g.id
        ${HavingClause}
        `;
    const [rows] = await DatabaseClient.query<Rows>(query, values);
    return rows as GameType[];
  }

  async read(id: number) {
    const [[game]] = await DatabaseClient.query<Rows>(
      "SELECT * FROM game WHERE game.id = ?",
      [id],
    );
    return game;
  }
}
export default new gameRepository();

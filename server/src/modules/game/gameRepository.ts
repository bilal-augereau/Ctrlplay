import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Game = {
  id: number;
  title: string;
  year: number | null;
  description: string | null;
};

class GameRepository {
  async readAll(limit = 20) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM game LIMIT ?",
      [limit],
    );
    return rows as Game[];
  }
}

export default new GameRepository();

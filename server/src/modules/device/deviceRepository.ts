import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class deviceRepository {
  async readAllByGameId(id: number) {
    const [devices] = await DatabaseClient.query<Rows>(
      "SELECT name FROM device JOIN game_device AS gd ON gd.device_id = device.id JOIN game ON gd.game_id = game.id WHERE game.id = ?",
      [id],
    );

    return devices.map((device) => device.name);
  }
}

export default new deviceRepository();

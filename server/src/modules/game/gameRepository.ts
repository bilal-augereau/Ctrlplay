import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Game = {
  id: string;
  title: string;
  year: number;
  description: string;
  image: string;
  image_2: string;
  note: number;
  genres: string[];
  tags: string[];
  devices: string[];
};

class gameRepository {
  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT game.*, genre.name AS genre, device.name AS device, tag.name AS tag FROM game LEFT JOIN game_genre AS gg ON gg.game_id = game.id LEFT JOIN genre ON gg.genre_id = genre.id LEFT JOIN game_device AS gd ON gd.game_id = game.id LEFT JOIN device ON gd.device_id = device.id LEFT JOIN game_tag AS gt ON gt.game_id = game.id LEFT JOIN tag ON gt.tag_id = tag.id WHERE game.id = ?",
      [id],
    );

    const game = <Game>{
      id: rows[0].id,
      title: rows[0].title,
      year: rows[0].year,
      description: rows[0].description,
      image: rows[0].image,
      image_2: rows[0].image_2,
      note: rows[0].note,
      genres: [],
      tags: [],
      devices: [],
    };

    for (const row of rows) {
      if (!game.genres.includes(row.genre)) {
        game.genres.push(row.genre);
      }
      if (!game.tags.includes(row.tag)) {
        game.tags.push(row.tag);
      }
      if (!game.devices.includes(row.device)) {
        game.devices.push(row.device);
      }
    }
    return game;
  }
}

export default new gameRepository();

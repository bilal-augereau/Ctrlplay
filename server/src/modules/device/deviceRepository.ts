import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

import type ScoredProperties from "../../interface/ScoredProperties";

class DeviceRepository {
	async readAllByGameId(gameId: number) {
		const [devices] = await databaseClient.query<Rows>(
			"SELECT name FROM device JOIN game_device AS gd ON gd.device_id = device.id JOIN game ON gd.game_id = game.id WHERE game.id = ?",
			[gameId],
		);

		return devices.map((device) => device.name);
	}

	async readAllbyUserId(userId: number) {
		const [devices] = await databaseClient.query<Rows>(
			"SELECT name, (SUM(CASE WHEN favorite = 1 THEN 2 ELSE 1 END)) AS score FROM device JOIN game_device gd ON gd.device_id = device.id JOIN game ON gd.game_id = game.id JOIN game_shelf gs ON gs.game_id = game.id WHERE gs.user_id = ? GROUP BY device.name",
			[userId],
		);

		return devices as ScoredProperties[];
	}

	async readAll() {
		const [devices] = await databaseClient.query<Rows>(
			"SELECT name FROM device",
		);

		return devices.map((device) => device.name);
	}
}

export default new DeviceRepository();

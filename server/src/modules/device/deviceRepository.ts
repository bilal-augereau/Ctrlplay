import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class DeviceRepository {
	async readAllByGameId(gameId: number) {
		const [devices] = await DatabaseClient.query<Rows>(
			"SELECT name FROM device JOIN game_device AS gd ON gd.device_id = device.id JOIN game ON gd.game_id = game.id WHERE game.id = ?",
			[gameId],
		);

		return devices.map((device) => device.name);
	}

	async readAllbyUserId(userId: number) {
		const [devices] = await DatabaseClient.query<Rows>(
			"SELECT name FROM device JOIN game_device gd ON gd.device_id = device.id JOIN game ON gd.game_id = game.id JOIN game_shelf gs ON gs.game_id = game.id WHERE gs.user_id = ? GROUP BY device.name",
			[userId],
		);

		return devices.map((device) => device.name);
	}
}

export default new DeviceRepository();

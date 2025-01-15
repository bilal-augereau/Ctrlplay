import games from "../gameDetails.json";
import AbstractSeeder from "./AbstractSeeder";
import DeviceSeeder from "./DeviceSeeder";
import GameSeeder from "./GameSeeder";

class GameDeviceSeeder extends AbstractSeeder {
	constructor() {
		super({
			table: "game_device",
			truncate: true,
			dependencies: [GameSeeder, DeviceSeeder],
		});
	}

	run() {
		const deviceIndexMapping = {
			PC: 1,
			PlayStation: 2,
			Xbox: 3,
			Nintendo: 4,
			Others: 5,
		};

		const insertedPairs = new Set<string>();

		for (const game of games) {
			const gameId = this.getRef(`game_${game.id}`).insertId;

			for (const parentPlatform of game.parent_platforms) {
				let platformName = parentPlatform.platform.name;

				if (platformName === "Apple Macintosh" || platformName === "Linux") {
					platformName = "PC";
				}

				if (
					!deviceIndexMapping[platformName as keyof typeof deviceIndexMapping]
				)
					platformName = "Others";

				const deviceRef = this.getRef(
					`device_${deviceIndexMapping[platformName as keyof typeof deviceIndexMapping]}`,
				);

				const deviceId = deviceRef.insertId;
				const pairKey = `${gameId}_${deviceId}`;

				if (!insertedPairs.has(pairKey)) {
					insertedPairs.add(pairKey);

					const newPairing: {
						game_id: number;
						device_id: number;
					} = {
						game_id: gameId,
						device_id: deviceId,
					};

					this.insert(newPairing);
				}
			}
		}
	}
}

export default GameDeviceSeeder;

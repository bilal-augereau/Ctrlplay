import AbstractSeeder from "./AbstractSeeder";

class PlatformSeeder extends AbstractSeeder {
	constructor() {
		super({ table: "platform", truncate: true });
	}

	run() {
		const platforms = ["steam"];

		for (let i = 0; i < 1; i++) {
			const platform = {
				name: platforms[i],
				refName: `platform_${i + 1}`,
			};
			this.insert(platform);
		}
	}
}

export default PlatformSeeder;

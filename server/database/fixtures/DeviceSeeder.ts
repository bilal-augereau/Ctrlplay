import AbstractSeeder from "./AbstractSeeder";

class DeviceSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "device", truncate: true });
  }

  run() {
    const devices = ["PC", "PlayStation", "Xbox", "Nintendo", "Others"];

    for (let i = 1; i < 6; i++) {
      const device = {
        name: devices[i - 1],
        refName: `device_${i}`,
      };
    }

    this.insert(devices);
  }
}

// Export the UserSeeder class
export default DeviceSeeder;

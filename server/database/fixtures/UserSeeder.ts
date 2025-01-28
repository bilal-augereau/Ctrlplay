import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
	constructor() {
		// Call the constructor of the parent class (AbstractSeeder) with appropriate options
		super({ table: "user", truncate: true });
	}

	// The run method - Populate the 'user' table with fake data

	run() {
		// Generate and insert fake data into the 'user' table
		const avatars = [
			"ezio",
			"hat",
			"isaac",
			"luigi",
			"pokeball",
			"poule",
			"rayman",
			"scorpion",
			"sonic",
			"spiderman",
		];

		for (let i = 0; i < 10; i += 1) {
			// Generate fake user data
			const fakeUser = {
				pseudo: this.faker.internet.userName(), // Generate a fake username using faker library
				password: this.faker.internet.password(), // Generate a fake password using faker library
				avatar: avatars[Math.floor(Math.random() * avatars.length)],
				refName: `user_${i}`, // Create a reference name for the user
			};

			// Insert the fakeUser data into the 'user' table
			this.insert(fakeUser); // insert into user(email, password) values (?, ?)
		}
	}
}

// Export the UserSeeder class
export default UserSeeder;

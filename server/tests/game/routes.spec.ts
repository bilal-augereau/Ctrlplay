import "dotenv/config";

import supertest from "supertest";
import databaseClient from "../../database/client";
import app from "../../src/app";

import type GameType from "../../src/interface/GameType";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let server: any;

const port = process.env.APP_PORT;

beforeAll((done) => {
	server = app
		.listen(port, () => {
			console.info(`Server is listening on port ${port}`);
			done();
		})
		.on("error", (err: Error) => {
			console.error("Error:", err.message);
		});
});

afterAll((done) => {
	databaseClient.end().then(() => {
		server.close();
		done();
	});
});

describe("GET /api/games with filters", () => {
	test("should fetch all games successfully", async () => {
		const response = await supertest(app).get("/api/games");

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(82);
	});

	test("should return all games with Indie as genre", async () => {
		const response = await supertest(app).get("/api/games?genre=Indie");

		expect(response.status).toBe(200);
		expect(
			response.body.every((game: GameType) => game.genres.includes("Indie")),
		).toBe(true);
	});

	test("should return all games with cooperative as tag", async () => {
		const response = await supertest(app).get("/api/games?tag=cooperative");

		expect(response.status).toBe(200);
		expect(
			response.body.every((game: GameType) =>
				game.tags.includes("cooperative"),
			),
		).toBe(true);
	});

	test("should return GTA for RockStar Games as publisher", async () => {
		const response = await supertest(app).get(
			"/api/games?publisher=Rockstar Games",
		);

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0].title).toBe("Grand Theft Auto V");
	});

	test("should return all games with 'the' in the title", async () => {
		const response = await supertest(app).get("/api/games?search=the");

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(14);
	});

	test("should return only the two witcher games", async () => {
		const response = await supertest(app).get("/api/games?search=the witcher");

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(2);
	});
});

describe("GET /api/games/:id", () => {
	test("should return one game", async () => {
		const response = await supertest(app).get("/api/games/2");

		expect(response.status).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toHaveProperty("title");
		expect(response.body).toHaveProperty("genres");
		expect(response.body.id).toBe(2);
	});

	test("should return error", async () => {
		const response = await supertest(app).get("/api/games/a");

		expect(response.status).toBe(500);
	});
});

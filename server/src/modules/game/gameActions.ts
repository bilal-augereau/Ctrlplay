import type { RequestHandler } from "express";

import deviceRepository from "../device/deviceRepository";
import genreRepository from "../genre/genreRepository";
import publisherRepository from "../publisher/publisherRepository";
import tagRepository from "../tag/tagRepository";
import gameRepository from "./gameRepository";

const read: RequestHandler = async (req, res, next) => {
	try {
		const gameId = Number(req.params.id);
		const game = await gameRepository.read(gameId);

		game.devices = await deviceRepository.readAllByGameId(gameId);
		game.genre = await genreRepository.readAllByGameId(gameId);
		game.tags = await tagRepository.readAllByGameId(gameId);
		game.publishers = await publisherRepository.readAllByGameId(gameId);

		if (!game) res.sendStatus(404);
		else res.json(game);
	} catch (err) {
		next(err);
	}
};

const addToUserLibrary: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;
		const userGame = { userId, gameId };
		await gameRepository.createUserGameLibrary(userGame);
		res
			.status(201)
			.json({ message: "Game added to user library successfully." });
	} catch (err) {
		next(err);
	}
};

export default { read, addToUserLibrary };

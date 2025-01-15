import type { RequestHandler } from "express";
import gameShelfRepository from "./gameShelfRepository";

const add: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;
		const userGame = { userId, gameId };
		await gameShelfRepository.createUserGameLibrary(userGame);
		res
			.status(201)
			.json({ message: "Game added to user library successfully." });
	} catch (err) {
		next(err);
	}
};

export default { add };

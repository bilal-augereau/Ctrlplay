import type { RequestHandler } from "express";

import gameShelfRepository from "../gameShelf/gameShelfRepository";
import userRepository from "./userRepository";

const read: RequestHandler = async (req, res, next) => {
	try {
		const userId = Number(req.params.id);
		const user = await userRepository.read(userId);

		if (!user) res.sendStatus(404);
		else {
			user.topGames = await gameShelfRepository.readAllByUser(
				userId,
				"DESC",
				3,
			);
			res.json(user);
		}
	} catch (err) {
		next(err);
	}
};

export default { read };

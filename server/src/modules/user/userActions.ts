import type { RequestHandler } from "express";

import gameShelfRepository from "../gameShelf/gameShelfRepository";
import userRepository from "./userRepository";

const read: RequestHandler = async (req, res, next) => {
	try {
		const userId = Number(req.params.id);
		const user = await userRepository.read(userId);

		// add 404 if !user
		user.favorites = await gameShelfRepository.readFavoritesByUser(userId);
		if (!user.favorites || user.favorites.length < 3) {
			user.library = await gameShelfRepository.readAllByUser(userId);
		}
		if (!user) res.sendStatus(404);
		else res.json(user);
	} catch (err) {
		next(err);
	}
};

export default { read };

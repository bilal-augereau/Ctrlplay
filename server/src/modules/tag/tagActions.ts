import type { RequestHandler } from "express";
import tagRepository from "./tagRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const tags = await tagRepository.readAll();

		if (!tags) res.sendStatus(404);
		else res.json(tags);
	} catch (err) {
		next(err);
	}
};

export default { browse };

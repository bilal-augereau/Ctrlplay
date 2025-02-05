import type { RequestHandler } from "express";
import publisherRepository from "./publisherRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const publishers = await publisherRepository.readAll();

		if (!publishers) res.sendStatus(404);
		else res.json(publishers);
	} catch (err) {
		next(err);
	}
};

export default { browse };

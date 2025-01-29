import type { RequestHandler } from "express";
import deviceRepository from "./deviceRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const devices = await deviceRepository.readAll();

		if (!devices) res.sendStatus(404);
		else res.json(devices);
	} catch (err) {
		next(err);
	}
};

export default { browse };

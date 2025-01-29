import type { RequestHandler } from "express";
import genreRepository from "./genreRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const genres = await genreRepository.readAll();

		if (!genres) res.sendStatus(404);
		else
			res.json(
				genres.map((genre) => genre.replace("Massively Multiplayer", "MMOG")),
			);
	} catch (err) {
		next(err);
	}
};

export default { browse };

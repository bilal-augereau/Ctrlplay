import type { RequestHandler } from "express";
import gameRepository from "../game/gameRepository";
import userRepository from "../user/userRepository";
import gameShelfRepository from "./gameShelfRepository";

const add: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const alreadyExists = await gameShelfRepository.exists(
			Number(userId),
			Number(gameId),
		);
		if (alreadyExists) {
			res
				.status(409)
				.json({ error: "Game already exists in the user's library." });
		}

		await gameShelfRepository.create(userId, gameId);

		res
			.status(201)
			.json({ message: "Game added to user library successfully." });
	} catch (err) {
		next(err);
	}
};

const remove: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const exists = await gameShelfRepository.exists(
			Number(userId),
			Number(gameId),
		);
		if (!exists) {
			res.status(404).json({ error: "Game not found in the user's library." });
		}

		await gameShelfRepository.delete(Number(userId), Number(gameId));

		res
			.status(200)
			.json({ message: "Game removed from user library successfully." });
	} catch (err) {
		next(err);
	}
};

const exists: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.exists(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ exists });
	} catch (err) {
		next(err);
	}
};

const browseUserGames: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "UserId is required." });
		}
		const games = await gameShelfRepository.readAllByUser(Number(id));
		res.json(games || []);
	} catch (err) {
		console.error("Erreur dans getUserGames:", err);
	}
};

const isFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.isFavorite(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ isFavorite: exists });
	} catch (err) {
		next(err);
	}
};

const browseFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "UserId is required." });
		}
		const games = await gameShelfRepository.readFavoritesByUser(Number(id));
		res.json(games || []);
	} catch (err) {
		console.error("Erreur dans browseFavorite:", err);
		next(err);
	}
};

const browseToDo: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "UserId is required." });
		}
		const games = await gameShelfRepository.readToDoByUser(Number(id));
		res.json(games || []);
	} catch (err) {
		console.error("Erreur dans browseFavorite:", err);
		next(err);
	}
};

const updateFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({
				error: "userId, gameId are required.",
			});
		} else {
			const user = await userRepository.read(userId);
			if (!user) {
				res.status(404).json({ error: "User not found." });
			} else {
				const game = await gameRepository.read(gameId);
				if (!game) {
					res.status(404).json({ error: "Game not found." });
				} else {
					const alreadyExists = await gameShelfRepository.exists(
						userId,
						gameId,
					);
					if (!alreadyExists) {
						await gameShelfRepository.create(userId, gameId);
					}

					const isFavorite = await gameShelfRepository.isFavorite(
						userId,
						gameId,
					);

					await gameShelfRepository.updateFavorite(userId, gameId, isFavorite);

					res.status(200).json({
						message: "game add to favorite successfully",
					});
				}
			}
		}
	} catch (err) {
		next(err);
	}
};
const removeFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		const favorites = await gameShelfRepository.readAllByUser(Number(userId));
		const isFavorite = favorites.some(
			(favGame) => Number(favGame.id) === Number(gameId),
		);
		if (!isFavorite) {
			res.status(404).json({
				error:
					"this game is not marked as favorite, cannot be removed from your list.",
			});
		}

		await gameShelfRepository.delete(Number(userId), Number(gameId));

		res
			.status(200)
			.json({ message: "Game removed from user favorite successfully." });
	} catch (err) {
		next(err);
	}
};
export default {
	add,
	remove,
	exists,
	browseUserGames,
	browseFavorite,
	browseToDo,
	updateFavorite,
	isFavorite,
	removeFavorite,
};

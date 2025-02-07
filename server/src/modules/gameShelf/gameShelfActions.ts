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

		const alreadyExists = await gameShelfRepository.read(
			Number(userId),
			Number(gameId),
		);
		if (alreadyExists && alreadyExists.length > 0) {
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
		const { userId, gameId } = req.params;

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

		const exists = await gameShelfRepository.read(
			Number(userId),
			Number(gameId),
		);
		if (!exists || exists.length === 0) {
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

const read: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.read(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ exists: exists.length > 0 });
	} catch (err) {
		next(err);
	}
};

const browseGamesByUser: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "UserId is required." });
		}
		const games = await gameShelfRepository.readAllByUser(Number(id));
		res.json(games || []);
	} catch (err) {
		next(err);
	}
};

const browseFavorites: RequestHandler = async (req, res, next) => {
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

const addFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.body;

		if (!userId || !gameId) {
			res.status(400).json({ error: "userId and gameId are required." });
		}

		const user = await userRepository.read(userId);
		if (!user) {
			res.status(404).json({ error: "User not found." });
		}

		const game = await gameRepository.read(gameId);
		if (!game) {
			res.status(404).json({ error: "Game not found." });
		}

		let existingGameShelf = await gameShelfRepository.read(userId, gameId);

		if (existingGameShelf.length === 0) {
			await gameShelfRepository.create(userId, gameId);
			existingGameShelf = await gameShelfRepository.read(userId, gameId);
		}

		if (Number(existingGameShelf[0]?.favorite) === 1) {
			res.status(200).json({ message: "Game is already in favorites." });
		}

		await gameShelfRepository.updateFavorite(userId, gameId, true);

		res.status(200).json({ message: "Game added to favorites successfully." });
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

		const existingGameShelf = await gameShelfRepository.read(userId, gameId);
		if (!existingGameShelf || existingGameShelf.length === 0) {
			res.status(404).json({
				error:
					"Game is not in the user's library, cannot be removed from favorites.",
			});
			return;
		}

		if (Number(existingGameShelf[0]?.favorite) !== 1) {
			res.status(404).json({
				error:
					"This game is not marked as favorite, cannot be removed from favorites.",
			});
		}

		await gameShelfRepository.updateFavorite(userId, gameId, false);

		res
			.status(200)
			.json({ message: "Game removed from favorites successfully." });
	} catch (err) {
		next(err);
	}
};

const isFavorite: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;
		const gameShelf = await gameShelfRepository.read(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({
			isFavorite: gameShelf.length > 0 && Number(gameShelf[0].favorite) === 1,
		});
	} catch (err) {
		next(err);
	}
};

const isToDo: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;

		if (!userId || !gameId) {
			res.status(400).json({ error: "Both userId and gameId are required." });
		}

		const exists = await gameShelfRepository.isToDo(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ isToDo: exists });
	} catch (err) {
		next(err);
	}
};

const browseFeaturedGames: RequestHandler = async (req, res, next) => {
	try {
		const games = await gameShelfRepository.readFeaturedGames();
		res.json(games);
	} catch (err) {
		console.error("Error retrieving featured games", err);
		next(err);
	}
};

const updateToDo: RequestHandler = async (req, res, next) => {
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
					const alreadyExists = await gameShelfRepository.read(userId, gameId);
					if (!alreadyExists) {
						await gameShelfRepository.create(userId, gameId);
					}

					const isToDo = await gameShelfRepository.isToDo(userId, gameId);

					await gameShelfRepository.updateToDo(userId, gameId, isToDo);

					res.status(200).json({
						message: "game add to your to do list successfully",
					});
				}
			}
		}
	} catch (err) {
		next(err);
	}
};

const removeToDo: RequestHandler = async (req, res, next) => {
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

		const toDo = await gameShelfRepository.readAllByUser(Number(userId));
		const isToDo = toDo.some(
			(favGame) => Number(favGame.id) === Number(gameId),
		);
		if (!isToDo) {
			res.status(404).json({
				error:
					"this game is not marked as in to do, cannot be removed from your list.",
			});
		}

		await gameShelfRepository.delete(Number(userId), Number(gameId));

		res.status(200).json({ message: "Game removed from your to do list." });
	} catch (err) {
		next(err);
	}
};

const updateTimeSpent: RequestHandler = async (req, res, next) => {
	try {
		const { userId, gameId } = req.params;
		const { timeSpent } = req.body;

		if (!userId || !gameId || timeSpent === undefined) {
			res
				.status(400)
				.json({ error: "userId, gameId, and timeSpent are required." });
			return;
		}

		if (
			Number.isNaN(Number(userId)) ||
			Number.isNaN(Number(gameId)) ||
			Number.isNaN(Number(timeSpent))
		) {
			res.status(400).json({
				error: "userId, gameId, and timeSpent must be valid numbers.",
			});
			return;
		}

		if (Number(timeSpent) < 0) {
			res.status(400).json({ error: "timeSpent cannot be negative." });
			return;
		}

		const user = await userRepository.read(Number(userId));
		if (!user) {
			res.status(404).json({ error: "User not found." });
			return;
		}

		const game = await gameRepository.read(Number(gameId));
		if (!game) {
			res.status(404).json({ error: "Game not found." });
			return;
		}

		const existingGameShelf = await gameShelfRepository.read(
			Number(userId),
			Number(gameId),
		);
		if (!existingGameShelf) {
			res.status(404).json({
				error: "Game is not in the user's library.",
			});
			return;
		}

		const updatedGameShelf = await gameShelfRepository.updateTimeSpent(
			Number(userId),
			Number(gameId),
			Number(timeSpent),
		);

		res.status(200).json({
			message: "Time spent updated successfully.",
			data: updatedGameShelf,
		});
	} catch (err) {
		console.error("Error updating timeSpent:", err);
		res
			.status(500)
			.json({ error: "An error occurred while updating timeSpent." });
	}
};

export default {
	add,
	remove,
	read,
	browseGamesByUser,
	browseFavorites,
	browseToDo,
	addFavorite,
	removeFavorite,
	browseFeaturedGames,
	updateToDo,
	isToDo,
	removeToDo,
	isFavorite,
	updateTimeSpent,
};

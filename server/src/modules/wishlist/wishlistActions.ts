import type { RequestHandler } from "express";
import gameRepository from "../game/gameRepository";
import userRepository from "../user/userRepository";
import wishlistRepository from "./wishlistRepository";

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

		const alreadyExists = await wishlistRepository.read(
			Number(userId),
			Number(gameId),
		);
		if (alreadyExists && alreadyExists.length > 0) {
			res
				.status(409)
				.json({ error: "Game already exists in the user's library." });
		}

		await wishlistRepository.create(userId, gameId);

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

		const exists = await wishlistRepository.read(
			Number(userId),
			Number(gameId),
		);
		if (!exists || exists.length === 0) {
			res.status(404).json({ error: "Game not found in the user's library." });
		}

		await wishlistRepository.delete(Number(userId), Number(gameId));

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

		const exists = await wishlistRepository.read(
			Number(userId),
			Number(gameId),
		);

		res.status(200).json({ exists: exists.length > 0 });
	} catch (err) {
		next(err);
	}
};

const browseByUser: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({ error: "UserId is required." });
		}
		const games = await wishlistRepository.readAllByUser(Number(id));
		res.json(games || []);
	} catch (err) {
		next(err);
	}
};

export default {
	add,
	remove,
	read,
	browseByUser,
};

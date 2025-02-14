import type { NextFunction, Request, RequestHandler, Response } from "express";
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

const add: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { pseudo, password, avatar } = req.body;

		if (!pseudo || !password) {
			res.status(400).json({ error: "Pseudo and password are required." });
			return;
		}

		const result = await userRepository.add(
			pseudo,
			password,
			avatar || "rayman",
		);

		if (!result.insertId) {
			res.status(422).json({ error: "Unable to add user." });
			return;
		}

		const user = await userRepository.read(result.insertId);

		res
			.status(201)
			.json({ message: "User added successfully", userId: result.insertId });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const edit: RequestHandler = async (req, res, next) => {
	try {
		const userId = Number(req.params.id);
		const { avatar } = req.body;

		if (!avatar) {
			res.status(400).json({ error: "Avatar is required." });
			return;
		}

		await userRepository.update(avatar, userId);

		res.status(201).json({ message: "User updated successfully" });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

export default { read, add, edit };

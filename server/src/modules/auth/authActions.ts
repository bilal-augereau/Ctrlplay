import argon from "argon2";
import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";

import gameShelfRepository from "../gameShelf/gameShelfRepository";
import userRepository from "../user/userRepository";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { pseudo, password } = req.body;

	try {
		const user = await userRepository.readByPseudo(pseudo);
		if (!user) {
			res.status(404).json({ error: "User not found" });
		} else {
			const passwordMatch = await argon.verify(user.password, password);
			if (!passwordMatch) {
				res.sendStatus(422);
			} else {
				if (!process.env.APP_SECRET) {
					throw new Error("APP_SECRET is not defined");
				}
				const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
					expiresIn: "1h",
				});
				user.token = token;
				const topGames = await gameShelfRepository.readAllByUser(
					user.id,
					"DESC",
					3,
				);
				if (topGames) user.topGames = topGames;
				res.status(200).json(user);
			}
		}
	} catch (error) {
		next(error);
	}
};

export default { login };

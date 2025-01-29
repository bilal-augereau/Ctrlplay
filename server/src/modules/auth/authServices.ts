import argon from "argon2";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const hashPassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		req.body.password = await argon.hash(req.body.password);

		next();
	} catch (err) {
		next(err);
	}
};

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;
	if (!token) res.status(401).json({ error: "Unauthorized" });
	else {
		if (!process.env.APP_SECRET) {
			res.status(500).json({ error: "Server configuration error" });
			return;
		}
		try {
			const isTokenValid = jwt.verify(token, process.env.APP_SECRET);
			if (!isTokenValid) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}
			next();
		} catch (err) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}
	}
};

export default { hashPassword, isAuthorized };

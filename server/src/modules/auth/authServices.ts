import argon from "argon2";
import type { NextFunction, Request, Response } from "express";

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

export default { hashPassword };

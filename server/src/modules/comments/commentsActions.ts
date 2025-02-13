import type { RequestHandler } from "express";
import type { RowDataPacket } from "mysql2";
import commentsRepository from "./commentsRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const gameId = Number(req.params.gameId);
		const comments = (await commentsRepository.readAllByGameId(
			gameId,
		)) as RowDataPacket[];

		if (comments.length === 0) res.sendStatus(404);
		else res.json(comments);
	} catch (err) {
		next(err);
	}
};

const add: RequestHandler = async (req, res, next) => {
	try {
		const { user_id, game_id, content, rating, avatar } = req.body;

		if (!user_id || !game_id || !content.trim() || rating < 1 || rating > 5) {
			res.status(400).json({
				error:
					"Tous les champs sont obligatoires et la note doit être entre 1 et 5.",
			});
		}

		const newComment = await commentsRepository.add(
			user_id,
			game_id,
			content,
			rating,
			avatar,
		);
		res.json(newComment);
	} catch (err) {
		next(err);
	}
};

const remove: RequestHandler = async (req, res, next) => {
	try {
		const commentId = Number(req.params.commentId);
		const gameId = Number(req.body.gameId);

		const deleted = await commentsRepository.remove(commentId, gameId);
		if (!deleted) res.sendStatus(404);
		else res.json({ message: "Commentaire supprimé" });
	} catch (err) {
		next(err);
	}
};

const readAverageRating: RequestHandler = async (req, res, next) => {
	try {
		const gameId = Number(req.params.gameId);
		const averageRating = await commentsRepository.getAverageRating(gameId);

		res.json({ averageRating });
	} catch (err) {
		next(err);
	}
};

export default { browse, add, remove, readAverageRating };

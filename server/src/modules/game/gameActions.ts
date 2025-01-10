import type { RequestHandler } from "express";

import gameRepository from "./gameRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const gameId = Number(req.params.id);
    const game = await gameRepository.read(gameId);

    if (game === null) {
      res.sendStatus(404);
    } else {
      res.json(game);
    }
  } catch (err) {
    next(err);
  }
};

export default { read };

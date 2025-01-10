import type { RequestHandler } from "express";
import gameRepository from "./gameRepository";

const browseGame: RequestHandler = async (req, res, next) => {
  try {
    const items = await gameRepository.readAll();

    const modifiedGame = items.map((game) => {
      const { description, ...rest } = game;
      return rest;
    });

    res.json(modifiedGame);
  } catch (err) {
    next(err);
  }
};

export default { browseGame };

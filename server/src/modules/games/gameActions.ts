import type { RequestHandler } from "express";
import gameRepository from "./gameRepository";

export const addToUserLibrary: RequestHandler = async (req, res, next) => {
  try {
    const { userId, gameId } = req.body;
    const userGame = { userId, gameId };
    await gameRepository.createUserGameLibrary(userGame);
    res
      .status(201)
      .json({ message: "Game added to user library successfully." });
  } catch (err) {
    next(err);
  }
};

export default { addToUserLibrary };

import type { RequestHandler } from "express";

import deviceRepository from "../device/deviceRepository";
import genreRepository from "../genre/genreRepository";
import publisherRepository from "../publisher/publisherRepository";
import tagRepository from "../tag/tagRepository";
import gameRepository from "./gameRepository";

const browse: RequestHandler = async (req, res, next) => {
	try {
		const items = await gameRepository.readAll(req.query);

		const modifiedGame = items.map((game) => {
			const { description, ...rest } = game;
			return rest;
		});

		res.json(modifiedGame);
	} catch (err) {
		next(err);
	}
};

const read: RequestHandler = async (req, res, next) => {
	try {
		const gameId = Number(req.params.id);
		const game = await gameRepository.read(gameId);

		game.devices = await deviceRepository.readAllByGameId(gameId);
		game.genres = await genreRepository.readAllByGameId(gameId);
		game.tags = await tagRepository.readAllByGameId(gameId);
		game.publishers = await publisherRepository.readAllByGameId(gameId);

		if (!game) res.sendStatus(404);
		else res.json(game);
	} catch (err) {
		next(err);
	}
};

const browseReco: RequestHandler = async (req, res, next) => {
	try {
		const userId = Number(req.params.id);

		const genres = await genreRepository.readAllbyUserId(userId);
		const devices = await deviceRepository.readAllbyUserId(userId);
		const tags = await tagRepository.readAllbyUserId(userId);

		const games = await gameRepository.readAllReco(
			userId,
			devices,
			genres,
			tags,
		);

		if (!games) res.sendStatus(404);
		else res.json(games);
	} catch (err) {
		next(err);
	}
};

const browseBySteamId: RequestHandler = async (req, res, next) => {
	try {
		const steamUserId = req.query.steamUserId as string;

		if (!steamUserId) {
			res.status(400).json({ error: "Missing steamUserId parameter" });
		}

		const steamAPIUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=E691525D883C8AF040583C746ED5BBD6&steamid=${steamUserId}&format=json`;

		const response = await fetch(steamAPIUrl);
		const data = await response.json();

		if (!data.response || !data.response.games) {
			res.status(404).json({ error: "No games found for this Steam user" });
		}

		const steamIds = data.response.games.map(
			(game: { appid: number }) => game.appid,
		);

		const games = await gameRepository.readAllBySteamId(steamIds);

		if (!games) {
			res.sendStatus(404);
		}

		res.json(games);
	} catch (err) {
		next(err);
	}
};

export default { read, browseReco, browse, browseBySteamId };

import express from "express";

const router = express.Router();

import authActions from "./modules/auth/authActions";
import authServices from "./modules/auth/authServices";
import deviceActions from "./modules/device/deviceActions";
import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import genreActions from "./modules/genre/genreActions";
import publisherActions from "./modules/publisher/publisherActions";
import tagActions from "./modules/tag/tagActions";
import userActions from "./modules/user/userActions";

router.post("/api/login", authActions.login);
router.post("/api/users", authServices.hashPassword, userActions.add);

router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);

router.get("/api/genres", genreActions.browse);
router.get("/api/devices", deviceActions.browse);
router.get("/api/tags", tagActions.browse);
router.get("/api/publishers", publisherActions.browse);

router.use("/api", authServices.isAuthorized);

router.post("/api/gameshelf", gameShelfActions.add);
router.delete("/api/gameshelf/", gameShelfActions.remove);
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.exists);
router.get("/api/users/:id", userActions.read);
router.put("/api/gameshelf/favorite", gameShelfActions.updateFavorite);
router.get(
	"/api/gameshelf/isFavorite/:userId/:gameId",
	gameShelfActions.isFavorite,
);

router.put("/api/gameshelf/to_do", gameShelfActions.updateToDo);

router.get("/api/gameshelf/isToDo/:userId/:gameId", gameShelfActions.isToDo);

router.get("/api/genres", genreActions.browse);

router.get("/api/devices", deviceActions.browse);

router.get("/api/tags", tagActions.browse);

router.get("/api/publishers", publisherActions.browse);

router.post("/api/gameshelf", gameShelfActions.add);
router.delete("/api/gameshelf/", gameShelfActions.remove);
router.post("/api/gameshelf", authServices.isAuthorized, gameShelfActions.add);
router.delete(
	"/api/gameshelf/",
	authServices.isAuthorized,
	gameShelfActions.remove,
);
router.delete("/api/gameshelf", gameShelfActions.remove);
router.put(
	"/api/gameshelf/favorite",
	gameShelfActions.updateFavorite,
	gameShelfActions.isFavorite,
);
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.exists);

router.get("/api/users/:id", userActions.read);
router.get("/api/users/:id/todo", gameShelfActions.browseToDo);
router.get("/api/users/:id/recommandation", gameActions.browseReco);
router.get("/api/users/:id/games", gameShelfActions.browseGamesByUser);
router.get("/api/users/:id/favorites", gameShelfActions.browseFavorites);

export default router;

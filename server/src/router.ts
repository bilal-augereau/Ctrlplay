import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import authServices from "./modules/auth/authServices";
import deviceActions from "./modules/device/deviceActions";
import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import genreActions from "./modules/genre/genreActions";
import publisherActions from "./modules/publisher/publisherActions";
import tagActions from "./modules/tag/tagActions";
import userActions from "./modules/user/userActions";

router.get("/api/games", gameActions.browse);
router.get("/api/games/featured/today", gameShelfActions.browseFeaturedGames);
router.get("/api/games/:id", gameActions.read);
router.put("/api/gameshelf", gameShelfActions.updateFavorite);
router.post("/api/gameshelf", gameShelfActions.add);
router.delete("/api/gameshelf/", gameShelfActions.remove);
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.exists);
router.get("/api/users/:id", userActions.read);
router.put(
	"/api/gameshelf/favorite",
	gameShelfActions.updateFavorite,
	gameShelfActions.isFavorite,
);

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
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.exists);

router.get("/api/users/:id", authServices.isAuthorized, userActions.read);
router.post("/api/users", authServices.hashPassword, userActions.add);
router.post("/api/login", authActions.login);
router.get("/api/users/:id/recommandation", gameActions.browseReco);

export default router;

import express from "express";

const router = express.Router();

import authActions from "./modules/auth/authActions";
import authServices from "./modules/auth/authServices";
import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import userActions from "./modules/user/userActions";

router.get("/games", gameActions.browseGame);

router.get("/games/:id", gameActions.read);
router.get("/api/games/:id", gameActions.read);

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

export default router;

import express from "express";

const router = express.Router();

import authServices from "./modules/auth/authServices";
import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import userActions from "./modules/user/userActions";

router.get("/api/games/:id", gameActions.read);

router.post("/api/gameshelf", gameShelfActions.add);
router.delete("/api/gameshelf/", gameShelfActions.remove);
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.exists);

router.get("/api/users/recommandation/:id", gameActions.browseReco);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", authServices.hashPassword, userActions.add);

export default router;

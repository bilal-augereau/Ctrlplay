import express from "express";

const router = express.Router();

import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import userActions from "./modules/user/userActions";

router.get("/api/games/:id", gameActions.read);

router.post("/api/gameshelf", gameShelfActions.add);

router.get("/api/users/:id", userActions.read);

export default router;

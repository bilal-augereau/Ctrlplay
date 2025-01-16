import express from "express";

const router = express.Router();

import gameActions from "./modules/game/gameActions";
import userActions from "./modules/user/userActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";

router.post("/api/gameshelf", gameShelfActions.add);
router.get("/api/games/:id", gameActions.read);

router.get("/api/users/:id", userActions.read);

export default router;

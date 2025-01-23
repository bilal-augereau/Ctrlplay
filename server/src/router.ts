import express from "express";

const router = express.Router();

import gameActions from "./modules/game/gameActions";

router.get("/games", gameActions.browseGame);

router.get("/games/:id", gameActions.read);

export default router;

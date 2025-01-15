import express from "express";

const router = express.Router();

import gameActions from "./modules/game/gameActions";
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);
router.get("/games", gameActions.browseGame);

router.get("/games/:id", gameActions.read);

export default router;

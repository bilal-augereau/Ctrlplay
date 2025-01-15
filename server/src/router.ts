import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";

router.post("/api/gameshelf", gameShelfActions.add);
router.get("/api/games/:id", gameActions.read);

export default router;

import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import gameActions from "./modules/game/gameActions";

router.post("/api/games/users", gameActions.addToUserLibrary);
router.get("/api/games/:id", gameActions.read);

export default router;

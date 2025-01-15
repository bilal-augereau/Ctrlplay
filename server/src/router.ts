import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import gameActions from "./modules/game/gameActions";

router.get("/api/games/:id", gameActions.read);

export default router;

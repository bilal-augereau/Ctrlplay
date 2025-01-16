import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import gameActions from "./modules/game/gameActions";
import userActions from "./modules/user/userActions";

router.get("/api/games/:id", gameActions.read);

router.get("/api/users/:id", userActions.read);

export default router;

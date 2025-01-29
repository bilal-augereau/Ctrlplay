import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import deviceActions from "./modules/device/deviceActions";
import gameActions from "./modules/game/gameActions";
import genreActions from "./modules/genre/genreActions";
import publisherActions from "./modules/publisher/publisherActions";
import tagActions from "./modules/tag/tagActions";

router.get("/api/games", gameActions.browse);
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import userActions from "./modules/user/userActions";

router.get("/api/games/:id", gameActions.read);

router.get("/api/genres", genreActions.browse);

router.get("/api/devices", deviceActions.browse);

router.get("/api/tags", tagActions.browse);

router.get("/api/publishers", publisherActions.browse);

router.post("/api/gameshelf", gameShelfActions.add);
router.delete("/api/gameshelf/", gameShelfActions.remove);
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.exists);

router.get("/api/users/:id", userActions.read);

export default router;

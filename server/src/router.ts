import express from "express";

const router = express.Router();

import authActions from "./modules/auth/authActions";
import authServices from "./modules/auth/authServices";
import commentsActions from "./modules/comments/commentsActions";
import deviceActions from "./modules/device/deviceActions";
import gameActions from "./modules/game/gameActions";
import gameShelfActions from "./modules/gameShelf/gameShelfActions";
import genreActions from "./modules/genre/genreActions";
import publisherActions from "./modules/publisher/publisherActions";
import tagActions from "./modules/tag/tagActions";
import userActions from "./modules/user/userActions";
import wishlistActions from "./modules/wishlist/wishlistActions";

router.get("/api/games", gameActions.browse);
router.get("/api/games/featured/today", gameShelfActions.browseFeaturedGames);
router.post("/api/login", authActions.login);
router.post("/api/users", authServices.hashPassword, userActions.add);

// Games
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);

// Genres, Devices, Tags, Publishers
router.get("/api/genres", genreActions.browse);
router.get("/api/devices", deviceActions.browse);
router.get("/api/tags", tagActions.browse);
router.get("/api/publishers", publisherActions.browse);

// Comments
router.get(
	"/api/comments/average-rating/:gameId",
	commentsActions.readAverageRating,
);

// Auth Middleware (protected routes)
router.use("/api", authServices.isAuthorized);

// Gameshelf
router.post("/api/gameshelf", gameShelfActions.add);
router.delete("/api/gameshelf/:userId/:gameId", gameShelfActions.remove);
router.get("/api/gameshelf/exists/:userId/:gameId", gameShelfActions.read);

// Favorite Games
router.put("/api/gameshelf/favorite", gameShelfActions.addFavorite);
router.get(
	"/api/gameshelf/isFavorite/:userId/:gameId",
	gameShelfActions.isFavorite,
);
router.delete("/api/gameshelf/favorite", gameShelfActions.removeFavorite);

// Wishlist
router.get("/api/wishlist/:userId/:gameId", wishlistActions.read);
router.post("/api/wishlist", wishlistActions.add);
router.delete("/api/wishlist/:userId/:gameId", wishlistActions.remove);

// Users
router.get("/api/users/:id", userActions.read);
router.get("/api/users/:id/games", gameShelfActions.browseGamesByUser);
router.get("/api/users/:id/favorites", gameShelfActions.browseFavorites);
router.get("/api/users/:id/recommandation", gameActions.browseReco);
router.get("/api/users/:id/wishlist", wishlistActions.browseByUser);

// Comments
router.get("/api/comments/:gameId", commentsActions.browse);
router.post("/api/comments", commentsActions.add);
router.delete("/api/comments/:commentId", commentsActions.remove);

export default router;

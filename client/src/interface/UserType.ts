import type GameType from "./GameType";

type UserGame = {
	pseudo: string;
	avatar: string;
	topGames?: GameType[];
};

export default UserGame;

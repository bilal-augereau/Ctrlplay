import type GameType from "./GameType";

type UserGame = {
	id: string;
	pseudo: string;
	avatar: string;
	topGames?: GameType[];
};

export default UserGame;

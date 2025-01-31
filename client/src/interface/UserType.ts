import type GameType from "./GameType";

type UserGame = {
	id: number;
	pseudo: string;
	avatar: string;
	topGames?: GameType[];
};

export default UserGame;

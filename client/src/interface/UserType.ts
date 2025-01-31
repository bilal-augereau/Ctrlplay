import type GameType from "./GameType";

type UserType = {
	id: number;
	pseudo: string;
	avatar: string;
	token: string;
	topGames?: GameType[];
};

export default UserType;

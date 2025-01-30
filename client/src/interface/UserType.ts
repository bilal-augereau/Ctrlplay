import type GameType from "./GameType";

type UserType = {
	id: number;
	pseudo: string;
	avatar: string;
	topGames?: GameType[];
};

export default UserType;

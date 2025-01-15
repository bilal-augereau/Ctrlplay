type GameType = {
	id: string;
	title: string;
	year: number;
	description: string;
	image: string;
	image_2: string;
	note: number;
	genres: string[];
	tags: string[];
	devices: Array<"PlayStation" | "Nintendo" | "PC" | "Xbox" | "Others">;
	publishers: string[];
	website: string;
};

export default GameType;

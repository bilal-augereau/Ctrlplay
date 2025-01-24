import { toast } from "react-toastify";

const getGameDetails = async (id: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/games/${id}`,
		);
		return await response.json();
	} catch (error) {
		toast.error("Error: Unable to load game details.", { theme: "dark" });
	}
};

export default getGameDetails;

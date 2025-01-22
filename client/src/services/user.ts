import { toast } from "react-toastify";

const getUserDetails = async (id: string) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/users/${id}`,
		);
		return await response.json();
	} catch (error) {
		toast.error("Error: Unable to load users infos.", { theme: "dark" });
	}
};

export default getUserDetails;

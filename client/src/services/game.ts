const getGameDetails = async (id: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/api/games/${id}`,
	);
	const data = await response.json();
	return data;
};

export default getGameDetails;

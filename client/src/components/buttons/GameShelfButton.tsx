import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GameShelfButton = ({
	userId,
	gameId,
}: {
	userId: number;
	gameId: number;
}) => {
	const [isInLibrary, setIsInLibrary] = useState(false);

	useEffect(() => {
		const checkLibrary = async () => {
			try {
				const response = await fetch(
					`http://localhost:3310/api/gameshelf/exists/${userId}/${gameId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					},
				);
				const { exists } = await response.json();
				setIsInLibrary(exists);
			} catch (err) {
				toast.error("Error: Unable to check game status.", { theme: "dark" });
			}
		};
		checkLibrary();
	}, [gameId, userId]);

	const addToLibrary = async () => {
		try {
			const response = await fetch("http://localhost:3310/api/gameshelf/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId, gameId }),
			});

			if (response.ok) {
				toast.success("Game added to user library successfully.", {
					theme: "dark",
				});
				setIsInLibrary(true);
			} else {
				toast.error("Game already exists in the user's library.", {
					theme: "dark",
				});
			}
		} catch (err) {
			toast.error("Error: Unable to connect to the server.", { theme: "dark" });
		}
	};

	const removeFromLibrary = async () => {
		try {
			const response = await fetch("http://localhost:3310/api/gameshelf/", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId, gameId }),
			});

			if (response.ok) {
				toast.success("Game removed from user library successfully.", {
					theme: "dark",
				});
				setIsInLibrary(false);
			} else {
				toast.error("Error: Unable to remove the game.", { theme: "dark" });
			}
		} catch (err) {
			toast.error("Error: Unable to connect to the server.", { theme: "dark" });
		}
	};

	return (
		<button
			type="button"
			onClick={isInLibrary ? removeFromLibrary : addToLibrary}
			className={"beautiful-buttonadd"}
		>
			{isInLibrary ? "-" : "+"}
		</button>
	);
};

export default GameShelfButton;

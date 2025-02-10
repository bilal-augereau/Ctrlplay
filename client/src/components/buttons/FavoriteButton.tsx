import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";

import favoriteImage from "../../assets/images/button_icons/favorite.png";
import favoriteEmpty from "../../assets/images/button_icons/favorite_empty.png";

const FavoriteButton = ({
	gameId,
	isFavorite,
	setIsFavorite,
}: {
	gameId: number;
	userId: number;
	isFavorite: boolean;
	setIsFavorite: (isFavorite: boolean) => void;
	isInLibrary: boolean;
}) => {
	const { user } = useAuth();
	const userId = user?.id;

	const handleToggleFavorite = async () => {
		if (!userId || !gameId) {
			toast.error("Missing userId or gameId.", { theme: "dark" });
			return;
		}

		try {
			let response: Response;
			if (isFavorite) {
				response = await fetch(
					"http://localhost:3310/api/gameshelf/favorite/",
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${user?.token}`,
						},
						body: JSON.stringify({ userId, gameId }),
					},
				);
			} else {
				response = await fetch("http://localhost:3310/api/gameshelf/favorite", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${user?.token}`,
					},
					body: JSON.stringify({ userId, gameId }),
				});
			}

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update favorite status.");
			}

			setIsFavorite(!isFavorite);
			toast.success(
				`Game ${isFavorite ? "removed from" : "added to"} favorites!`,
				{ theme: "dark" },
			);
		} catch (err) {
			toast.error("This is not working", { theme: "dark" });
		}
	};

	return (
		<button
			type="button"
			onClick={handleToggleFavorite}
			className={"beautiful-buttonadd"}
			disabled={!userId}
		>
			<img
				src={isFavorite ? favoriteImage : favoriteEmpty}
				alt="Favorite Icon"
			/>
		</button>
	);
};

export default FavoriteButton;

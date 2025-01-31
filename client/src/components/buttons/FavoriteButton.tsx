import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";

import favoriteImage from "../../assets/images/button_icons/favorite.png";
import favoriteEmpty from "../../assets/images/button_icons/favorite_empty.png";

const favoriteButton = ({ gameId }: { userId: number; gameId: number }) => {
	const [isInLibrary, setIsInLibrary] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const { user } = useAuth();
	const userId = user?.id;

	useEffect(() => {
		if (isFavorite) setIsInLibrary(true);
	}, [isFavorite]);

	useEffect(() => {
		const fetchGameStatus = async () => {
			try {
				const response = await fetch(
					`http://localhost:3310/api/gameshelf/exists/${userId}/${gameId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${user?.token}`,
						},
					},
				);
				const { exists } = await response.json();
				setIsInLibrary(exists);
				if (exists) {
					try {
						const response = await fetch(
							`http://localhost:3310/api/gameshelf/isFavorite/${userId}/${gameId}`,
							{
								method: "GET",
								headers: {
									"Content-Type": "application/json",
									Authorization: `${user?.token}`,
								},
							},
						);
						const { isFavorite } = await response.json();
						setIsFavorite(isFavorite);
					} catch (err) {
						toast.error("Error: Unable to check favorite status.", {
							theme: "dark",
						});
					}
				}
			} catch (err) {
				toast.error("Erreur:  Unable to check game status.", {
					theme: "dark",
				});
			}
		};

		fetchGameStatus();
	}, [gameId, userId, user]);

	const handleToggleFavorite = async () => {
		try {
			await fetch("http://localhost:3310/api/gameshelf/favorite", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${user?.token}`,
				},
				body: JSON.stringify({ userId, gameId }),
			});

			toast.success(
				`Game ${!isFavorite ? "add to favorite" : "remove from favorite"} !`,
				{ theme: "dark" },
			);
			setIsFavorite(!isFavorite);
		} catch (err) {
			toast.error("failed to update favorite.", {
				theme: "dark",
			});
		}
	};

	return (
		<button
			type="button"
			onClick={handleToggleFavorite}
			className="beautiful-buttonadd"
		>
			{isInLibrary ? (
				<img
					src={isFavorite ? favoriteImage : favoriteEmpty}
					alt="Favorite Icon"
				/>
			) : (
				<img src={favoriteImage} alt="Favorite Icon" />
			)}
		</button>
	);
};

export default favoriteButton;

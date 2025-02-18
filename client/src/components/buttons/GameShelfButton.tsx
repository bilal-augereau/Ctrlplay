import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";

import addedLibraryIcon from "../../assets/images/button_icons/bookactive.png";
import removedLibraryIcon from "../../assets/images/button_icons/bookinactive.png";

const GameShelfButton = ({
	gameId,
	isInLibrary,
	setIsInLibrary,
}: {
	gameId: number;
	userId: number;
	isInLibrary: boolean;
	setIsInLibrary: (value: boolean) => void;
}) => {
	const { user } = useAuth();
	const userId = user?.id;

	const toggleLibraryStatus = async () => {
		if (!userId) {
			toast.error("You must be logged in to modify your library.", {
				theme: "dark",
			});
		}

		try {
			let response: Response;
			if (isInLibrary) {
				response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/gameshelf/${userId}/${gameId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${user?.token}`,
						},
					},
				);
			} else {
				response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/gameshelf`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${user?.token}`,
						},
						body: JSON.stringify({ userId, gameId }),
					},
				);
			}

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update library.");
			}

			setIsInLibrary(!isInLibrary);
			toast.success(
				`Game ${isInLibrary ? "removed from" : "added to"} your library successfully.`,
				{ theme: "dark" },
			);
		} catch (err) {
			toast.error("This is not working", { theme: "dark" });
		}
	};

	return (
		<button
			type="button"
			onClick={toggleLibraryStatus}
			className={"beautiful-buttonadd"}
			title={isInLibrary ? "Remove from library" : "Add to library"}
		>
			<img
				src={isInLibrary ? addedLibraryIcon : removedLibraryIcon}
				alt={isInLibrary ? "Remove from library" : "Add to library"}
			/>
			{isInLibrary ? "-" : "+"}
		</button>
	);
};

export default GameShelfButton;

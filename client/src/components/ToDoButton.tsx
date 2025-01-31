import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import toDoImage from "../assets/images/button_icons/check.png";
import toDoEmpty from "../assets/images/button_icons/checkempty.png";

const toDoButton = ({ userId, gameId }: { userId: number; gameId: number }) => {
	const [isInLibrary, setIsInLibrary] = useState(false);
	const [isToDo, setIsToDo] = useState(false);

	useEffect(() => {
		if (isToDo) setIsInLibrary(true);
	}, [isToDo]);

	useEffect(() => {
		const fetchGameStatus = async () => {
			try {
				const response = await fetch(
					`http://localhost:3310/api/gameshelf/exists/${userId}/${gameId}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
					},
				);
				const { exists } = await response.json();
				setIsInLibrary(exists);
				if (exists) {
					try {
						const response = await fetch(
							`http://localhost:3310/api/gameshelf/isToDo/${userId}/${gameId}`,
							{
								method: "GET",
								headers: { "Content-Type": "application/json" },
							},
						);
						const { isToDo } = await response.json();
						setIsToDo(isToDo);
					} catch (err) {
						toast.error("Error: Unable to check to do list status.", {
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
	}, [gameId, userId]);

	const handleToggleToDO = async () => {
		try {
			await fetch("http://localhost:3310/api/gameshelf/to_do", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, gameId }),
			});

			toast.success(
				`Game ${!isToDo ? "add to your to do list" : "remove from your to do list"} !`,
				{ theme: "dark" },
			);
			setIsToDo(!isToDo);
		} catch (err) {
			toast.error("failed to update favorite.", {
				theme: "dark",
			});
		}
	};

	return (
		<button
			type="button"
			onClick={handleToggleToDO}
			className="beautiful-buttonadd"
		>
			{isInLibrary ? (
				<img src={isToDo ? toDoImage : toDoEmpty} alt="Favorite Icon" />
			) : (
				<img src={toDoEmpty} alt="Favorite Icon" />
			)}
		</button>
	);
};

export default toDoButton;

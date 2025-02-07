import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import clock from "../../assets/images/button_icons/clocktimespent.png";
import { useAuth } from "../../context/UserContext";
import "./TimeSpent.css";

interface TimeSpentProps {
	gameId: number;
	onTimeSpentChange: (timeSpent: number) => void;
}

const TimeSpent = ({ gameId, onTimeSpentChange }: TimeSpentProps) => {
	const { user } = useAuth();
	const userId = user?.id;

	const [timeSpent, setTimeSpent] = useState<number>(0);
	const [isEditing, setIsEditing] = useState(false);
	const [newTimeSpent, setNewTimeSpent] = useState<number | string>("");

	useEffect(() => {
		const fetchTimeSpent = async () => {
			if (!userId || !gameId) return;

			try {
				const response = await fetch(
					`/api/gameshelf/timespent/${userId}/${gameId}`,
				);

				if (!response.ok) {
					throw new Error(`Server error: ${response.status}`);
				}

				const data = await response.json();
				if (data?.time_spent !== undefined) {
					setTimeSpent(data.time_spent);
					setNewTimeSpent(data.time_spent);
				}
			} catch (error) {
				console.error("Error fetching time spent:", error);
				toast.error("Error fetching time spent", { theme: "dark" });
			}
		};

		fetchTimeSpent();
	}, [gameId, userId]);

	const updateTimeSpentInDatabase = async (newTime: number) => {
		if (!userId || !gameId) {
			toast.error("User or game ID is missing.", { theme: "dark" });
			return;
		}

		try {
			const response = await fetch(
				`/api/gameshelf/timespent/${userId}/${gameId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ timeSpent: newTime }),
				},
			);

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const data = await response.json();

			setTimeSpent(data.time_spent);
			setNewTimeSpent(data.time_spent);
			onTimeSpentChange(data.time_spent);
			toast.success("Time spent updated successfully.", { theme: "dark" });
		} catch (error) {
			console.error("Error updating time spent:", error);
			toast.error("Error updating time spent.", { theme: "dark" });
		}
	};

	const handleClick = () => {
		setIsEditing(true);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTimeSpent(event.target.value);
	};

	const handleBlur = () => {
		const finalValue = newTimeSpent === "" ? 0 : Number(newTimeSpent);
		setTimeSpent(finalValue);
		setIsEditing(false);
		updateTimeSpentInDatabase(finalValue);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleBlur();
		}
	};

	return (
		<div className="time-spent-container">
			<img src={clock} alt="Clock" className="clock-image" />

			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className="time-spent-display" onClick={handleClick}>
				Time spent: {timeSpent} hours played
			</div>

			{isEditing && (
				<input
					type="number"
					value={newTimeSpent}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className="time-spent-input"
					min="0"
				/>
			)}
		</div>
	);
};

export default TimeSpent;

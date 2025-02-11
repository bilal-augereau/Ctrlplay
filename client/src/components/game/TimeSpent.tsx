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
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/gameshelf/${userId}/${gameId}`,
					{
						headers: user?.token ? { Authorization: user.token } : {},
					},
				);
				if (!response.ok) {
					throw new Error("Failed to fetch time spent.");
				}
				const { gameState } = await response.json();
				if (Object.keys(gameState[0]).length > 0) {
					setTimeSpent(gameState[0].time_spent);
					setNewTimeSpent(gameState.time_spent);
				}
			} catch (error) {
				toast.error("Error fetching time spent", { theme: "dark" });
			}
		};
		fetchTimeSpent();
	}, [gameId, userId, user]);

	const updateTimeSpentInDatabase = async (newTime: number) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/gameshelf/timespent/${userId}/${gameId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						...(user?.token && { Authorization: user.token }),
					},
					body: JSON.stringify({ timeSpent: newTime }),
				},
			);
			if (!response.ok) {
				throw new Error("Failed to update time spent.");
			}
			onTimeSpentChange(newTime);
			toast.success("Time spent updated successfully.", { theme: "dark" });
		} catch (error) {
			toast.error("Error updating time spent.", { theme: "dark" });
		}
	};
	const handleClick = () => {
		setIsEditing(true);
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (
			value === "" ||
			!Number.isNaN(Number(value)) ||
			/^(\d+(\.\d{1,2})?)?$/.test(value)
		) {
			setNewTimeSpent(value === "" ? "" : value);
		}
	};
	const handleBlur = () => {
		const finalValue = newTimeSpent === "" ? 0 : Number(newTimeSpent);
		setTimeSpent(finalValue);
		setIsEditing(false);
		updateTimeSpentInDatabase(finalValue);
	};
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
					onKeyPress={handleKeyPress}
					className="time-spent-input"
					min="0"
				/>
			)}
		</div>
	);
};
export default TimeSpent;

import { useState } from "react";
import clock from "../../assets/images/button_icons/clocktimespent.png";
import "./TimeSpent.css";

interface TimeSpentProps {
	initialTimeSpent?: number;
	onTimeSpentChange: (timeSpent: number) => void;
}

const TimeSpent: React.FC<TimeSpentProps> = ({
	initialTimeSpent = 0,
	onTimeSpentChange,
}) => {
	const [timeSpent, setTimeSpent] = useState<number>(initialTimeSpent);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [newTimeSpent, setNewTimeSpent] = useState<number | string>(timeSpent);

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
		onTimeSpentChange(finalValue);
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

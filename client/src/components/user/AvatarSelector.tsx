import { useEffect, useState } from "react";

import Avatar from "./Avatar";

import leftarrowsignup from "../../assets/images/button_icons/leftarrowsignup.png";
import rightarrowsignup from "../../assets/images/button_icons/rightarrowsignup.png";

const avatarList = [
	"poule",
	"hat",
	"isaac",
	"luigi",
	"pokeball",
	"rayman",
	"sonic",
	"spiderman",
];

interface AvatarSelectorProps {
	setAvatar: (avatar: string) => void;
}

const AvatarSelector = ({ setAvatar }: AvatarSelectorProps) => {
	const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

	useEffect(() => {
		setAvatar(avatarList[currentAvatarIndex]);
	}, [currentAvatarIndex, setAvatar]);

	const handlePreviousAvatar = () => {
		setCurrentAvatarIndex((prevIndex) =>
			prevIndex === 0 ? avatarList.length - 1 : prevIndex - 1,
		);
	};

	const handleNextAvatar = () => {
		setCurrentAvatarIndex((prevIndex) =>
			prevIndex === avatarList.length - 1 ? 0 : prevIndex + 1,
		);
	};

	return (
		<div className="avatar">
			<button type="button">
				<img
					src={leftarrowsignup}
					alt="Previous avatar"
					onClick={handlePreviousAvatar}
					onKeyUp={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handlePreviousAvatar();
						}
					}}
					className="avatar-arrow"
				/>
			</button>
			<div className="avatar-image">
				<Avatar avatar={avatarList[currentAvatarIndex]} />
			</div>
			<button type="button">
				<img
					src={rightarrowsignup}
					alt="Next avatar"
					onClick={handleNextAvatar}
					onKeyUp={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleNextAvatar();
						}
					}}
					className="avatar-arrow"
				/>
			</button>
		</div>
	);
};

export default AvatarSelector;

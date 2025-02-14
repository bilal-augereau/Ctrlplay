import { useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/UserContext";

import Avatar from "./Avatar";
import AvatarSelector from "./AvatarSelector";
import Top3 from "./Top3";

const UserWelcome = () => {
	const [showAvatar, setShowAvatar] = useState(false);
	const [newAvatar, setNewAvatar] = useState("");
	const { user, setUser } = useAuth();

	const changeAvatar = async () => {
		if (!user) return;

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${user.token}`,
					},
					body: JSON.stringify({ avatar: newAvatar }),
				},
			);

			if (!response.ok) {
				toast.error("Avatar could not be updated.");
				return;
			}

			setUser((prevUser) =>
				prevUser ? { ...prevUser, avatar: newAvatar } : null,
			);
			toast.success("Avatar updated successfully!");
			setShowAvatar(false);
		} catch (err) {
			toast.error("Error: could not connect to server");
		}
	};

	return (
		<section className="content-box" id="user-welcome-box">
			<div id="user-welcome">
				{user?.avatar && <Avatar avatar={user?.avatar} />}
				<div>
					<h2>Welcome {user?.pseudo}!</h2>
					{showAvatar ? (
						<button
							type="submit"
							onClick={changeAvatar}
							className="user-button-change-avatar"
						>
							Confirm
						</button>
					) : (
						<button
							type="button"
							onClick={() => setShowAvatar(true)}
							className="user-button-change-avatar"
						>
							Change my avatar
						</button>
					)}
				</div>
			</div>

			{showAvatar && (
				<div>
					<AvatarSelector setAvatar={setNewAvatar} />
				</div>
			)}

			{user?.topGames && user?.topGames.length > 0 && (
				<Top3 topGames={user.topGames} />
			)}
		</section>
	);
};

export default UserWelcome;

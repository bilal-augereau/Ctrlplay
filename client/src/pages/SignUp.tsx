import "./SignUp.css";
import { useState } from "react";
import leftarrowsignup from "../assets/images/button_icons/leftarrowsignup.png";
import rightarrowsignup from "../assets/images/button_icons/rightarrowsignup.png";
import Avatar from "../components/UserComponents/Avatar.tsx";

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

function SignUp() {
	const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

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
		<div id="main">
			<section className="content-box">
				<div className="content-boxsignup">
					<h1>Welcome new user!</h1>
					<p className="textsignup">
						Ctrl+Play is a digital platform for gamers to organize their game
						collection. Sign up for free and start building your dream
						Gameshelf!
					</p>
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
						<p className="textsignup">Choose your avatar</p>
					</div>
					<form className="formsignup">
						<div className="labelgroup">
							<label htmlFor="username">What should we call you?</label>
							<input type="text" id="username" name="username" />
						</div>
						<div className="labelgroup">
							<label htmlFor="password">Choose a password</label>
							<input type="password" id="password" name="password" />
						</div>
						<div className="labelgroup">
							<label htmlFor="passwordconfirmation">
								Confirm your password
							</label>
							<input
								type="password"
								id="passwordconfirmation"
								name="passwordconfirmation"
							/>
						</div>
					</form>
					<p className="textsignup">
						If you want to help us recommend you the right game, you can answer
						some questions about your gaming habits. You can also do it later on
						your profile page.
					</p>
				</div>
				<div className="buttons">
					<button className="beautiful-button" type="button">
						Complete my profile
					</button>
					<button className="beautiful-button" type="button">
						Just sign up for now
					</button>
				</div>
				<p className="textsignup">Already have an account?</p>
			</section>
		</div>
	);
}

export default SignUp;

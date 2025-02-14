import "./SignUp.css";
import { type FormEventHandler, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leftarrowsignup from "../assets/images/button_icons/leftarrowsignup.png";
import rightarrowsignup from "../assets/images/button_icons/rightarrowsignup.png";
import Avatar from "../components/user/Avatar.tsx";

const avatarList = [
	"megaman",
	"kirby",
	"hat",
	"isaac",
	"mario",
	"luigi",
	"pokeball",
	"rayman",
	"sonic",
	"spiderman",
	"batman",
	"umbrella",
	"poule",
	"donkeykong",
	"mk",
	"lara",
	"link",
	"peach",
	"thesims",
];

function SignUp() {
	const navigate = useNavigate();

	const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
	const [error, setError] = useState("");
	const pseudoRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);

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

	const handleInputChange = () => {
		setError("");
	};

	const validateRegister: FormEventHandler = async (e) => {
		e.preventDefault();
		const pseudo = pseudoRef.current?.value;
		const password = passwordRef.current?.value;
		const passwordConfirmation = passwordConfirmationRef.current?.value;
		const avatar = avatarList[currentAvatarIndex];

		if (
			!password ||
			!passwordConfirmation ||
			password !== passwordConfirmation
		) {
			setError("Passwords do not match or are empty.");
			return;
		}

		if (!pseudo) {
			setError("Pseudo is required.");
			return;
		}

		try {
			const response = await fetch("http://localhost:3310/api/users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pseudo,
					password,
					avatar,
				}),
			});

			if (response.ok) {
				navigate("/login");
			} else {
				setError("Error: Unable to create user account.");
			}
		} catch (error) {
			console.error(error);
			setError("Error: Unable to connect to the server.");
		}
	};

	return (
		<>
			{error && error}
			<div id="main">
				<section className="content-box" id="boxsignup">
					<div className="content-boxsignup">
						<h1 id="titlesignup">Welcome new user!</h1>
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
								<label htmlFor="username">What should we call you? : </label>
								<input
									className="game-tag"
									type="text"
									id="username"
									name="username"
									ref={pseudoRef}
									onChange={handleInputChange}
								/>
							</div>
							<div className="labelgroup">
								<label htmlFor="password">Choose a password : </label>
								<input
									className="game-tag"
									type="password"
									id="password"
									name="password"
									ref={passwordRef}
									onChange={handleInputChange}
								/>
							</div>
							<div className="labelgroup">
								<label htmlFor="passwordconfirmation">
									Confirm your password :
								</label>
								<input
									className="game-tag"
									type="password"
									id="passwordconfirmation"
									name="passwordconfirmation"
									ref={passwordConfirmationRef}
									onChange={handleInputChange}
								/>
							</div>
						</form>
						<p className="textsignup">
							If you want to help us recommend you the right game, you can
							answer some questions about your gaming habits. You can also do it
							later on your profile page.
						</p>
					</div>
					<div className="buttons" id="buttonsignup">
						<button id="buttonwidth" className="beautiful-button" type="button">
							Complete my profile
						</button>
						<button
							onClick={validateRegister}
							id="buttonwidth"
							className="beautiful-button"
							type="button"
						>
							Just sign up for now
						</button>
					</div>

					<Link to="/login" className="alreadyaccount">
						Already have an account?
					</Link>
				</section>
			</div>
		</>
	);
}

export default SignUp;

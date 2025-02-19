import "./SignUp.css";
import { type FormEventHandler, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarSelector from "../components/user/AvatarSelector.tsx";

function SignUp() {
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const pseudoRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);
	const [selectedAvatar, setSelectedAvatar] = useState("poule");

	const handleInputChange = () => {
		setError("");
	};

	const validateRegister: FormEventHandler = async (e) => {
		e.preventDefault();
		const pseudo = pseudoRef.current?.value;
		const password = passwordRef.current?.value;
		const passwordConfirmation = passwordConfirmationRef.current?.value;
		const avatar = selectedAvatar;

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
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/users/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ pseudo, password, avatar }),
				},
			);

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
							<AvatarSelector setAvatar={setSelectedAvatar} />
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
						{/* <button id="buttonwidth" className="beautiful-button" type="button">
							Complete my profile
						</button> */}
						<button
							onClick={validateRegister}
							id="buttonwidth"
							className="beautiful-button"
							type="button"
						>
							Create my account
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

import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/UserContext";

import "./Login.css";

function Login() {
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const pseudoRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { setUser } = useAuth();

	const handleInputChange = () => {
		setError("");
	};

	const submitLogin: FormEventHandler = async (e) => {
		e.preventDefault();
		const pseudo = pseudoRef.current?.value;
		const password = passwordRef.current?.value;

		if (!password) {
			setError("Password is required.");
			return;
		}

		if (!pseudo) {
			setError("Pseudo is required.");
			return;
		}

		try {
			const response = await fetch("http://localhost:3310/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pseudo,
					password,
				}),
			});

			if (response.status === 200) {
				const user = await response.json();
				setUser(user);
				navigate(`/user/${user.id}`);
			} else {
				setError("Error: Unable to log in.");
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
				<section className="content-box" id="boxlogin">
					<div className="content-boxsignup">
						<h1 id="titlesignup">Login</h1>
					</div>
					<form className="formsignup" onSubmit={submitLogin}>
						<div className="labelgroup" id="labelgroupentity">
							<label htmlFor="username">Username : </label>
							<input
								className="game-tag"
								type="text"
								id="username"
								name="username"
								ref={pseudoRef}
								onChange={handleInputChange}
							/>
						</div>
						<div className="labelgroup" id="labelgroupentity">
							<label htmlFor="password">Password : </label>
							<input
								className="game-tag"
								type="password"
								id="password"
								name="password"
								ref={passwordRef}
								onChange={handleInputChange}
							/>
						</div>
						<div className="buttons" id="buttonlogin">
							<button
								onClick={submitLogin}
								id="buttonwidth"
								className="beautiful-button"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
					<Link to="/signup" className="signup">
						I don't have an account : sign up
					</Link>
				</section>
			</div>
		</>
	);
}

export default Login;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

import Avatar from "./UserComponents/Avatar";

import "./Header.css";

function Header() {
	const navigate = useNavigate();
	const { user, setUser } = useAuth();

	const handleFooter = () => {
		const footerPortal = document.getElementById("footer-portal");
		if (footerPortal) {
			footerPortal.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleLogin = () => {
		navigate("/login");
	};

	const handleSignUp = () => {
		navigate("/signup");
	};

	const handleUserPage = () => {
		if (user) navigate(`/user/${user.id}`);
	};

	const handleDisconnect = () => {
		setUser(null);
		navigate("/");
	};

	return (
		<header className="header">
			<button
				type="button"
				className="logo-button"
				onClick={() => navigate("/")}
			/>
			<div className="header-buttons">
				<button
					type="button"
					className="top-portal-button header-button"
					onClick={handleFooter}
				/>
				{!user ? (
					<>
						<button
							type="button"
							className="login-button header-button"
							onClick={handleLogin}
						>
							Login
						</button>
						<button
							type="button"
							className="signup-button header-button"
							onClick={handleSignUp}
						>
							Sign Up
						</button>
					</>
				) : (
					<>
						<button
							type="button"
							className="mypage-button header-button"
							onClick={handleUserPage}
						>
							My Page
							<Avatar avatar={user.avatar} />
						</button>
						<button
							type="button"
							className="disconnect-button header-button"
							onClick={handleDisconnect}
						>
							Disconnect
						</button>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

import type ScrollType from "../interface/ScrollType";
import Avatar from "./user/Avatar";
import "./Header.css";
import PortalButtonOne from "./buttons/PortalButtonOne";

function Header({ scrollToRefTwo, scrollToRefOne }: ScrollType) {
	const navigate = useNavigate();
	const { user, setUser } = useAuth();

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
				<div ref={scrollToRefOne}>
					<PortalButtonOne
						scrollToRefOne={scrollToRefOne}
						scrollToRefTwo={scrollToRefTwo}
					/>
				</div>
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

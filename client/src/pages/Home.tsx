import Featured from "../components/home/Featured";
import GameList from "../components/home/GameList";
import WelcomeBanner from "../components/home/WelcomeBanner";
import { useAuth } from "../context/UserContext";

import "./Home.css";

function Home() {
	const { user } = useAuth();

	return (
		<div>
			<div>
				<header className="home-header" />
				{!user && <WelcomeBanner />}
				<Featured />
				<div className="game-list">
					<GameList />
				</div>
			</div>
		</div>
	);
}

export default Home;

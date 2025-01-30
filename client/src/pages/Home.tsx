import Featured from "../components/home/Featured";
import GameList from "../components/home/GameList";
import WelcomeBanner from "../components/home/WelcomeBanner";

import "./Home.css";

function Home() {
	return (
		<div>
			<header className="home-header" />
			<WelcomeBanner />
			<Featured />

			<div className="game-list">
				<GameList />
			</div>
		</div>
	);
}

export default Home;

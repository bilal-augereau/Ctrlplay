import Featured from "../components/HomeComponents/Featured";
import GameList from "../components/HomeComponents/GameList";
import WelcomeBanner from "../components/HomeComponents/WelcomeBanner";

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

import { useOutletContext } from "react-router-dom";
import Featured from "../components/Featured";
import GameList from "../components/GameList";
import WelcomeBanner from "../components/WelcomeBanner";
import type { AppContextInterface } from "../types/appContext.type";
import "./Home.css";

function Home() {
	const { user } = useOutletContext<AppContextInterface>();
	return (
		<div>
			<p>Welcome : {user?.pseudo}</p>
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

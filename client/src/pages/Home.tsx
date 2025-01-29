import FavoriteButton from "../components/FavoriteButton";
import GameShelfButton from "../components/GameShelfButton";

function Home() {
	return (
		<div>
			<h1>Home Page</h1>
			<button className="beautiful-button" type="button">
				Login
			</button>
			<GameShelfButton gameId={1} userId={1} />
			<FavoriteButton gameId={1} userId={1} />
		</div>
	);
}

export default Home;

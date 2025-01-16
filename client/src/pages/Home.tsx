import LibraryButton from "../components/LibraryButton";

function Home() {
	return (
		<div>
			<h1>Home Page</h1>
			<button className="beautiful-button" type="button">
				Login
			</button>
			<LibraryButton gameId={1} userId={1} />
		</div>
	);
}

export default Home;

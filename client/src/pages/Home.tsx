import AddToLibraryButton from "../components/Addtolibrarybutton";

function Home() {
	return (
		<div>
			<h1>Home Page</h1>
			<button className="beautiful-button" type="button">
				Login
			</button>
			<AddToLibraryButton gameId={1} userId={1} />
		</div>
	);
}

export default Home;

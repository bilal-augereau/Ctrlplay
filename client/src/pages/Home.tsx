import FilterGame from "../components/Filters";
import SearchBar from "../components/SearchBar";

function Home() {
	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the Home Page!</p>
			<SearchBar />
			<FilterGame />
		</div>
	);
}

export default Home;

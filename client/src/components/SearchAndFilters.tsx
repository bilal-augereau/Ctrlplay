import SearchBar from "./SearchBar";
import FilterGame from "./home/FiltersGame";

function SearchAndFilters() {
	return (
		<section className="content-box">
			<SearchBar />
			<FilterGame />
		</section>
	);
}

export default SearchAndFilters;

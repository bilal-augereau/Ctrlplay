import SearchBar from "./SearchBar";
import FilterGame from "./home/FiltersGame";

import "./SearchAndFilters.css";

function SearchAndFilters() {
	return (
		<section className="search-and-filters">
			<SearchBar />
			<FilterGame />
		</section>
	);
}

export default SearchAndFilters;

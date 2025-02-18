import { useState } from "react";
import type { FormEventHandler } from "react";

import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import loupe from "../assets/images/button_icons/loupe.png";
import { useSearch } from "../context/SearchContext";

function SearchBar() {
	const { setSearchQuery } = useSearch();
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleSearch: FormEventHandler = (event) => {
		event.preventDefault();
		setSearchQuery(search);
		navigate("/results");
	};

	return (
		<div className="search-container">
			<div className="research">
				<form className="search-bar" onSubmit={handleSearch}>
					<input
						type="text"
						name="searchGame"
						placeholder="Search a game or use filters"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button type="submit" className="search-icon">
						<img src={loupe} alt="loupe search" />
					</button>
				</form>
			</div>
		</div>
	);
}

export default SearchBar;

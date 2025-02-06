import { useState } from "react";
import type { FormEventHandler } from "react";

import "./SearchBar.css";
import loupe from "../assets/images/button_icons/loupe.png";

type SearchProps = {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ setSearchQuery }: SearchProps) {
	const [search, setSearch] = useState("");

	const handleSearch: FormEventHandler = (event) => {
		event.preventDefault();
		setSearchQuery(search);
	};

	return (
		<div className="search-container">
			<div className="research">
				<h3 className="search-game">Search a game</h3>
				<form className="search-bar" onSubmit={handleSearch}>
					<input
						type="text"
						name="searchGame"
						placeholder="Search for a content."
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

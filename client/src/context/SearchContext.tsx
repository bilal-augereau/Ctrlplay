import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Filters = {
	genres: string[];
	devices: string[];
	tags: string[];
	publishers: string[];
};

type SearchContextType = {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedFilters: Filters;
	setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedFilters, setSelectedFilters] = useState<Filters>({
		genres: [],
		devices: [],
		tags: [],
		publishers: [],
	});

	return (
		<SearchContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				selectedFilters,
				setSelectedFilters,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};

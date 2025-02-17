import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";
import SearchAndFilters from "./components/SearchAndFilters";
import { SearchProvider } from "./context/SearchContext";

function App() {
	const scrollToRefOne = useRef(null);
	const scrollToRefTwo = useRef(null);

	return (
		<>
			<UserProvider>
				<Header
					scrollToRefTwo={scrollToRefTwo}
					scrollToRefOne={scrollToRefOne}
				/>
				<SearchProvider>
					<SearchAndFilters />
					<ToastContainer stacked autoClose={3000} />
					<Outlet />
				</SearchProvider>
			</UserProvider>
			<Footer scrollToRefOne={scrollToRefOne} scrollToRefTwo={scrollToRefTwo} />
		</>
	);
}

export default App;

import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import Footer from "./components/Footer";
import Header from "./components/Header";
import PopUp from "./components/PopUp";

import "./App.css";
import SearchAndFilters from "./components/SearchAndFilters";
import { SearchProvider } from "./context/SearchContext";

function App() {
	const scrollToRefOne = useRef(null);
	const scrollToRefTwo = useRef(null);

	const [popUp, setPopUp] = useState(true);

	return (
		<>
			{popUp && <PopUp setPopUp={setPopUp} />}
			<body className={popUp ? "grey" : ""}>
				<UserProvider>
					<Header
						scrollToRefTwo={scrollToRefTwo}
						scrollToRefOne={scrollToRefOne}
					/>
					<SearchProvider>
						<SearchAndFilters />
						<ToastContainer
							className="toast-position"
							stacked
							autoClose={3000}
						/>
						<Outlet />
					</SearchProvider>
				</UserProvider>
				<Footer
					scrollToRefOne={scrollToRefOne}
					scrollToRefTwo={scrollToRefTwo}
				/>
			</body>
		</>
	);
}

export default App;

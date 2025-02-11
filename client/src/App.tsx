import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

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
				<ToastContainer stacked autoClose={3000} />
				<Outlet />
			</UserProvider>
			<Footer scrollToRefOne={scrollToRefOne} scrollToRefTwo={scrollToRefTwo} />
		</>
	);
}

export default App;

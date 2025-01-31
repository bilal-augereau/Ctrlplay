import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./App.css";

function App() {
	return (
		<>
			<UserProvider>
				<Header />
				<ToastContainer stacked autoClose={3000} />
				<Outlet />
			</UserProvider>
			<Footer />
		</>
	);
}

export default App;

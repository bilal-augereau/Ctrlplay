import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
	const [user, setUser] = useState(null);
	return (
		<>
			<Header />
			<ToastContainer stacked autoClose={3000} />
			<Outlet context={{ user, setUser }} />
			<Footer />
		</>
	);
}

export default App;

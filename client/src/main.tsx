import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";

import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

const getGameDetails = (id: string) => {
	return fetch(`${import.meta.env.VITE_API_URL}/api/games/${id}`)
		.then((res) => res.json())
		.then((data) => data);
};

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/userpage",
				element: <UserPage />,
			},
			{
				path: "/game/:id",
				element: <GameDetails />,
				loader: ({ params }) => {
					return getGameDetails(params.id ?? "0");
				},
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
	throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);

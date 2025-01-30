import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";

import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

import PrivateRoute from "./components/PrivateRoute";

import getGameDetails from "./services/game";
import getUserDetails from "./services/user";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/user",
				element: <PrivateRoute />,
				children: [
					{
						path: ":id",
						element: <UserPage />,
						loader: ({ params }) => getUserDetails(params.id ?? "0"),
					},
				],
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

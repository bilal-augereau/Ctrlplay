import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const PrivateRoute = () => {
	const { user } = useAuth();

	return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

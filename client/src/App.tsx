import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer stacked autoClose={3000} />
      <Outlet />
    </>
  );
}

export default App;

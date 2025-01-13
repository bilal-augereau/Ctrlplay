import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import WelcomeBanner from "./components/WelcomeBanner";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <WelcomeBanner />
      <Outlet />
    </>
  );
}

export default App;

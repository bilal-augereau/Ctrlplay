import ListGames from "../components/ListGames";
import WelcomeBanner from "../components/WelcomeBanner";
import "./Home.css";

function Home() {
  return (
    <div>
      <header className="home-header" />
      <WelcomeBanner />

      <div className="game-list">
        <ListGames />
      </div>
    </div>
  );
}

export default Home;

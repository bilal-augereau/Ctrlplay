import ListGames from "../components/ListGames";
import "./Home.css";

function Home() {
  return (
    <div>
      <header className="home-header" />

      <div className="game-list">
        <ListGames />
      </div>
    </div>
  );
}

export default Home;

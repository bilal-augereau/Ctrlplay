import ListGames from "../components/ListGames";
import "./Home.css";

function Home() {
  return (
    <div>
      <header className="home-header" />
      <h1>Welcome to your ultimate game library!</h1>
      <p>
        Crtl+Play is a digital platform for gamers to organize their game
        collection. Sign up for free and start building your dream Gameshelf!
      </p>
      <div className="game-list">
        <ListGames />
      </div>
    </div>
  );
}

export default Home;

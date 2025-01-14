import { useEffect, useState } from "react";
import "./featured.css";

interface Game {
  id: number;
  name: string;
  image: string;
}

const Featured = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3310/games/:id");
        const allGames = await response.json();
        const filteredGames = allGames.filter((game: Game) =>
          [28, 30, 7, 14].includes(game.id),
        );
        setGames(filteredGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < games.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : games.length - 1,
    );
  };

  return (
    <div className="content-box">
      <button type="button" className="arrow left" onClick={handlePrevious} />

      <div className="featured-slider">
        {games.length > 0 && (
          <div
            className="featured-card"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {games.map((game) => (
              <div key={game.id} className="game-item">
                <img src={game.image} alt={game.name} className="game-image" />
                <h3 className="game-name">{game.name}</h3>
                <div className="game-actions">
                  <button type="button" className="info-button">
                    See more info
                  </button>
                  <button type="button" className="add-button">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="button" className="arrow right" onClick={handleNext} />
    </div>
  );
};

export default Featured;

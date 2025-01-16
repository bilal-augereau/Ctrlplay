import { useEffect, useState } from "react";
import type GameType from "../interface/GameType";
import "./featured.css";

const Featured = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrimaryImage, setIsPrimaryImage] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3310/games");
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const allGames = await response.json();
        const filteredGames = allGames.filter((game: GameType) =>
          [1, 16, 32, 66].includes(Number(game.id)),
        );
        setGames(filteredGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleNext = () => {
    if (games.length > 0) {
      setIsPrimaryImage(true);
      setCurrentIndex((prevIndex) =>
        prevIndex < games.length - 1 ? prevIndex + 1 : 0,
      );
    }
  };

  const handlePrevious = () => {
    if (games.length > 0) {
      setIsPrimaryImage(true);
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : games.length - 1,
      );
    }
  };

  const toggleImage = () => {
    setIsPrimaryImage(!isPrimaryImage);
  };

  const handleThumbnailClick = () => {
    setIsPrimaryImage(false);
  };

  return (
    <div className="content-box" id="featured">
      <h2 className="featured-title">Featured Games</h2>
      <button
        type="button"
        className="arrow left"
        onClick={handlePrevious}
        aria-label="Previous"
      />

      {games.length > 0 && (
        <div className="featured-card">
          <img
            src={
              isPrimaryImage
                ? games[currentIndex].image
                : games[currentIndex].image_2
            }
            alt={games[currentIndex]?.title || "Game"}
            className="game-image big"
            onClick={toggleImage}
            onKeyDown={toggleImage}
          />
          <div className="thumb-text">
            <h3 className="game-name">{games[currentIndex]?.title}</h3>
            <img
              src={
                isPrimaryImage
                  ? games[currentIndex].image_2
                  : games[currentIndex].image
              }
              alt="Thumbnail"
              className="game-thumbnail"
              onClick={handleThumbnailClick}
              onKeyDown={handleThumbnailClick}
            />
          </div>
        </div>
      )}
      <div className="game-actions">
        <button type="button" className="beautiful-button">
          i
        </button>
        <button type="button" className="beautiful-buttonadd">
          +
        </button>
      </div>

      <button
        type="button"
        className="arrow right"
        onClick={handleNext}
        aria-label="Next"
      />
    </div>
  );
};

export default Featured;

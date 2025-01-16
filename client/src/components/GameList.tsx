import { useEffect, useState } from "react";
import type GameType from "../interface/GameType";
import GameCard from "./GameCard";
import "./GameList.css";

function GameList() {
  const [recentReleases, setRecentReleases] = useState<GameType[]>([]);
  const [allTimeFavorites, setAllTimeFavorites] = useState<GameType[]>([]);
  const [showMoreReleases, setShowMoreReleases] = useState(false);
  const [showMoreFavorites, setShowMoreFavorites] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3310/games");
        const games: GameType[] = await response.json();

        const sortedByYear = [...games]
          .filter((game) => game.year)
          .sort((a, b) => (b.year || 0) - (a.year || 0));
        setRecentReleases(sortedByYear);

        const sortedByNote = [...games]
          .filter((game) => game.note)
          .sort((a, b) => (b.note || 0) - (a.note || 0));
        setAllTimeFavorites(sortedByNote);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="main-content" id="box-principal">
      <section className="recent-releases">
        <h2>Recent Releases</h2>
        <div className="recent-releases-list">
          {(showMoreReleases ? recentReleases : recentReleases.slice(0, 5)).map(
            (game) => (
              <GameCard key={game.id} game={game} />
            ),
          )}
        </div>
        {recentReleases.length > 5 && (
          <button
            type="button"
            onClick={() => setShowMoreReleases(!showMoreReleases)}
          >
            {showMoreReleases ? "Show Less" : "See More"}
          </button>
        )}
      </section>

      <section className="all-time-favorites">
        <h2>All Time Favorites</h2>
        <div className="all-time-favorites-list">
          {(showMoreFavorites
            ? allTimeFavorites
            : allTimeFavorites.slice(0, 5)
          ).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {allTimeFavorites.length > 5 && (
          <button
            type="button"
            onClick={() => setShowMoreFavorites(!showMoreFavorites)}
          >
            {showMoreFavorites ? "Show Less" : "See More"}
          </button>
        )}
      </section>
    </div>
  );
}

export default GameList;

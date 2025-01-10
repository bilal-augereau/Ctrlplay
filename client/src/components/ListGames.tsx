import { useEffect, useState } from "react";
import GameCard from "./GameCard";

interface Game {
  id: number;
  title: string;
  year: number | null;
  image: string | null;
  image_2: string | null;
}

function ListGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3310/");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-list">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default ListGames;

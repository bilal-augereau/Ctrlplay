import { useLoaderData } from "react-router-dom";

import type GameType from "../interface/GameType";

function GameDetails() {
  const game = useLoaderData() as GameType;

  return (
    <main id="game-details-main">
      <section id="game-details-section">
        {game ? (
          <>
            <img src={game.image} alt={`Banner of ${game.title}`} />
            <h1>{game.title}</h1>
            <p>{game.year}</p>
            {game.genres.map((genre) => (
              <p key={genre}>{genre}</p>
            ))}
            <p>{game.description}</p>
            {game.tags.map((tag) => (
              <p key={tag} className="game-details-tags">
                {tag}
              </p>
            ))}
            <p>{game.note}</p>
            <img
              src={game.image_2}
              alt={`Alternative illustration of ${game.title}`}
            />
          </>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}

export default GameDetails;

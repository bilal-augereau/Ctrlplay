import { useLoaderData } from "react-router-dom";

import type GameType from "../interface/GameType";

import "./GameDetails.css";

import Nintendo from "../assets/images/devices/Nintendo.png";
import Others from "../assets/images/devices/Others.png";
import PC from "../assets/images/devices/PC.png";
import PlayStation from "../assets/images/devices/PlayStation.png";
import Xbox from "../assets/images/devices/Xbox.png";

function GameDetails() {
  const game = useLoaderData() as GameType;

  const devicesURL = {
    PC: PC,
    Nintendo: Nintendo,
    Xbox: Xbox,
    PlayStation: PlayStation,
    Others: Others,
  };

  return (
    <main id="game-details-main">
      <section id="game-details-section" className="content-box">
        {game ? (
          <>
            <img
              src={game.image}
              alt={`Banner of ${game.title}`}
              id="game-details-banner"
            />
            <article id="game-details-content">
              <div>
                <h1 id="game-details-title" className="game-details-text">
                  {game.title}
                </h1>
                <p className="game-details-text">{game.year}</p>
                <p className="game-details-text">{game.genres.join(", ")}</p>
                <p className="game-details-text">{game.description}</p>
                <div className="game-details-lists">
                  {game.tags.map((tag) => (
                    <p key={tag} className="game-details-tag">
                      #{tag}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p>{game.note}</p>
                <div className="game-details-lists">
                  {game.devices.map((device: keyof typeof devicesURL) => (
                    <img src={devicesURL[device]} alt={device} key={device} />
                  ))}
                </div>
              </div>
            </article>
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

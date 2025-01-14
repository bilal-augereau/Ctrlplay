import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import type GameType from "../interface/GameType";

import GameTags from "../components/GameTags";
import GameDevices from "../components/GameDevices";

import "./GameDetails.css";

import whiteStars from "../assets/images/ratings/0stars.png";
import yellowStars from "../assets/images/ratings/5stars.png";

function GameDetails() {
	const game = useLoaderData() as GameType;

	const descriptionCleaned = DOMPurify.sanitize(game.description, {
		USE_PROFILES: { html: true },
	});

	return (
		<main id="game-details-main">
			<section id="game-details-section" className="content-box">
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
						<p className="game-details-text">{game.publishers.join(", ")}</p>
						<p className="game-details-text">{parse(descriptionCleaned)}</p>
						<div className="game-details-lists">
							<GameTags tags={game.tags} />
						</div>
					</div>
					<div>
						<img
							src={whiteStars}
							alt={`rating : ${game.note}/5`}
							id="game-details-stars"
						/>
						<img
							src={yellowStars}
							alt={`rating : ${game.note}/5`}
							width={`${(100 * game.note) / 5}px`}
							id="game-details-rating"
						/>
						<div className="game-details-lists">
							<GameDevices devices={game.devices} />
						</div>
					</div>
				</article>
				<img
					src={game.image_2}
					alt={`Alternative illustration of ${game.title}`}
					id="game-details-img-bottom"
				/>
				<div className="game-details-lists">
					<button type="button" className="beautiful-buttonadd">
						+
					</button>
					<button type="button" className="beautiful-buttonadd">
						🤍
					</button>
					<button type="button" className="beautiful-buttonadd">
						✔️
					</button>
					<a href={game.website} className="beautiful-button">
						See the website
					</a>
				</div>
			</section>
		</main>
	);
}

export default GameDetails;

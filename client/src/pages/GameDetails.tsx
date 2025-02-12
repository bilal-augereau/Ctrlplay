import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useLoaderData } from "react-router-dom";

import type GameType from "../interface/GameType";

import GameButtons from "../components/buttons/GameButtons";
import GameDevices from "../components/game/GameDevices";
import GameRatings from "../components/game/GameRatings";
import GameTags from "../components/game/GameTags";
import TimeSpent from "../components/game/TimeSpent";
import { useAuth } from "../context/UserContext";

import "./GameDetails.css";

function GameDetails() {
	const game = useLoaderData() as GameType;
	const { user } = useAuth();

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
						<GameRatings note={game.note} />
						<div className="game-details-lists">
							<GameDevices devices={game.devices} />
							{user && (
								<TimeSpent
									gameId={Number(game.id)}
									onTimeSpentChange={() => {}}
								/>
							)}
						</div>
					</div>
				</article>
				<img
					src={game.image_2}
					alt={`Alternative illustration of ${game.title}`}
					id="game-details-img-bottom"
				/>
				<div className="game-details-lists">
					<GameButtons game={game} />
					<a href={game.website} className="beautiful-button">
						See the website
					</a>
				</div>
			</section>
		</main>
	);
}

export default GameDetails;

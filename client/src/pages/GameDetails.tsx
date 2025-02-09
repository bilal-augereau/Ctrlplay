import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../context/UserContext";

import type GameType from "../interface/GameType";

import GameDevices from "../components/game/GameDevices";
import GameRatings from "../components/game/GameRatings";
import GameTags from "../components/game/GameTags";
import CommentSection from "../components/user/CommentSection";

import FavoriteButton from "../components/buttons/FavoriteButton";
import GameShelfButton from "../components/buttons/GameShelfButton";
import commentService from "../services/commentService";

import "./GameDetails.css";
import { useState } from "react";

function GameDetails() {
	const game = useLoaderData() as GameType;
	const { user } = useAuth();
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const [isInLibrary, setIsInLibrary] = useState<boolean>(false);

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
						</div>
					</div>
				</article>
				<img
					src={game.image_2}
					alt={`Alternative illustration of ${game.title}`}
					id="game-details-img-bottom"
				/>
				<div className="game-details-lists">
					{user ? (
						<>
							<GameShelfButton
								userId={user.id}
								gameId={Number.parseInt(game.id)}
								isFavorite={isFavorite}
								setIsInLibrary={setIsInLibrary}
								isInLibrary={isInLibrary}
							/>
							<FavoriteButton
								userId={user.id}
								gameId={Number.parseInt(game.id)}
								isFavorite={isFavorite}
								setIsFavorite={setIsFavorite}
								isInLibrary={isInLibrary}
							/>
						</>
					) : (
						<></>
					)}
					<a href={game.website} className="beautiful-button">
						See the website
					</a>
				</div>
			</section>
			<CommentSection
				gameId={Number(game.id)}
				commentService={commentService}
			/>
		</main>
	);
}

export default GameDetails;

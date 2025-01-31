import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import GameRatings from "../game/GameRatings";

import type GameType from "../../interface/GameType";

interface FeaturedGameProps {
	game: GameType;
}

const GameFeature = ({ game }: FeaturedGameProps) => {
	const shortDescription = parse(
		DOMPurify.sanitize(
			game.description.length <= 250
				? game.description
				: `${game.description.slice(0, game.description.slice(0, 250).lastIndexOf(" "))}...`,
			{
				USE_PROFILES: { html: true },
			},
		),
	);

	return (
		<section className="content-box" id="user-featured-game">
			<img id="user-game-banner" src={game.image} alt={game.title} />
			<div id="user-game-details">
				<div>
					<h4>{game.title}</h4>
					<GameRatings note={game.note} />
				</div>
				{shortDescription && <p>{shortDescription}</p>}
				<Link
					to={`/game/${game.id}`}
					className="beautiful-button user-beautiful-button"
				>
					Check this game
				</Link>
			</div>
		</section>
	);
};

export default GameFeature;

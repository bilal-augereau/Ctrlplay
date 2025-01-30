import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import type GameType from "../../interface/GameType";
import GameRatings from "../GameComponents/GameRatings";

interface FeaturedGameProps {
	game: GameType;
}

const FeaturedGame = ({ game }: FeaturedGameProps) => {
	const shortenDescription = (description: string, maxChar: number) => {
		if (description.length <= maxChar) return description;
		const shorten = description.slice(0, maxChar);
		return `${shorten.slice(0, shorten.lastIndexOf(" "))}...`;
	};

	const shortDescription = parse(
		DOMPurify.sanitize(shortenDescription(game.description, 250), {
			USE_PROFILES: { html: true },
		}),
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

export default FeaturedGame;

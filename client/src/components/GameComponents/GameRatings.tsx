import "./GameRatings.css";

import whiteStars from "../../assets/images/ratings/0stars.png";
import yellowStars from "../../assets/images/ratings/5stars.png";

function GameRatings({ note }: { note: number }) {
	return (
		<div id="ratings-div">
			<img
				src={whiteStars}
				alt={`rating : ${note}/5`}
				id="ratings-empty-stars"
			/>
			<img
				src={yellowStars}
				alt={`rating : ${note}/5`}
				width={`${(100 * note) / 5}px`}
				id="ratings-full-stars"
			/>
		</div>
	);
}

export default GameRatings;

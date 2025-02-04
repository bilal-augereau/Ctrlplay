import { useState } from "react";

import "./GameTags.css";

function GameTags({ tags }: { tags: string[] }) {
	const [showTags, setShowTags] = useState(false);
	const handleTags = () => setShowTags(!showTags);

	return (
		<>
			{showTags
				? tags.map((tag) => (
						<p key={tag} className="game-tag">
							#{tag}
						</p>
					))
				: tags.slice(0, 3).map((tag) => (
						<p key={tag} className="game-tag">
							#{tag}
						</p>
					))}
			<button
				type="button"
				className="button-tags"
				onClick={handleTags}
				onKeyUp={(e) => {
					if (e.key === " " || e.key === "Spacebar") {
						handleTags();
					}
				}}
			>
				{showTags ? "Hide" : "Show all tags"}
			</button>
		</>
	);
}

export default GameTags;

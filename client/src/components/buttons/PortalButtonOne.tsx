import { useState } from "react";
import bigportalblue from "../../assets/images/button_icons/bigportalbleu.png";
import bigportalorange from "../../assets/images/button_icons/bigportalorange.png";
import bigportalviolet from "../../assets/images/button_icons/bigportalviolet.png";
import type ScrollType from "../../interface/ScrollType";

const imagesOrder1 = [bigportalorange, bigportalviolet, bigportalblue];

export default function PortalButtonOne({ scrollToRefTwo }: ScrollType) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const handleClick = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		let index = 0;
		const interval = setInterval(() => {
			setCurrentIndex(index);
			index++;
			if (index === imagesOrder1.length) {
				clearInterval(interval);
				setIsAnimating(false);
				setTimeout(() => {
					scrollToRefTwo.current?.scrollIntoView({ behavior: "smooth" });
				}, 200);
			}
		}, 200);
	};

	return (
		<button
			type="button"
			className="top-portal-button header-button"
			onClick={handleClick}
			disabled={isAnimating}
		>
			<img src={imagesOrder1[currentIndex]} alt="Portal" id="imgportal" />
		</button>
	);
}

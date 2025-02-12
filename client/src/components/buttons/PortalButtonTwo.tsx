import { useState } from "react";
import bigportalblue from "../../assets/images/button_icons/bigportalbleu.png";
import bigportalorange from "../../assets/images/button_icons/bigportalorange.png";
import bigportalviolet from "../../assets/images/button_icons/bigportalviolet.png";
import type ScrollType from "../../interface/ScrollType";

const imagesOrder2 = [bigportalblue, bigportalviolet, bigportalorange];

export default function PortalButtonTwo({ scrollToRefOne }: ScrollType) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const handleClick = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		let index = 0;
		const interval = setInterval(() => {
			setCurrentIndex(index);
			index++;
			if (index === imagesOrder2.length) {
				clearInterval(interval);
				setIsAnimating(false);
				setTimeout(() => {
					scrollToRefOne.current?.scrollIntoView({ behavior: "smooth" });
				}, 200);
			}
		}, 200);
	};
	return (
		<button
			type="button"
			className="footer-portal"
			onClick={handleClick}
			disabled={isAnimating}
		>
			<img src={imagesOrder2[currentIndex]} alt="Portal" id="imgportal" />
		</button>
	);
}

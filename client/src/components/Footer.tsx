import "./Footer.css";
import im from "../../src/assets/images/button_icons/IM.png";
import type ScrollType from "../interface/ScrollType";
import PortalButtonTwo from "./buttons/PortalButtonTwo";

function Footer({ scrollToRefOne, scrollToRefTwo }: ScrollType) {
	return (
		<footer className="footer">
			<div className="footer-left">
				<a
					href="https://persona.atlus.com/p5r/?lang=en"
					className="footer-link"
					target="_blank"
					rel="noreferrer"
					aria-label="Visit Persona 5 Royal website"
				>
					<button type="button" className="footer-IM">
						<img src={im} alt="IM" />
					</button>
				</a>
			</div>

			<div className="footer-center">
				<div ref={scrollToRefTwo}>
					<PortalButtonTwo
						scrollToRefOne={scrollToRefOne}
						scrollToRefTwo={scrollToRefTwo}
					/>
				</div>
			</div>

			<div className="footer-right">
				<p>
					<a
						className="about-us"
						href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
						target="_blank"
						rel="noreferrer"
					>
						{" "}
						About Us{" "}
					</a>{" "}
					| All Rights Reserved
				</p>
			</div>
		</footer>
	);
}

export default Footer;

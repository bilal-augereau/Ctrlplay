import gameshelf from "../../assets/images/button_icons/bookactive.png";
import wishlist from "../../assets/images/button_icons/check.png";
import favorite from "../../assets/images/button_icons/favorite.png";
import logoSmall from "../../assets/images/logo.png";

import "./Tuto.css";

function Tuto() {
	return (
		<article id="user-tuto">
			<h3 id="user-tuto-header">
				<img src={logoSmall} alt="our cute logo" id="user-small-logo" />
				Oops, it's empty in here... There is no game yet!
			</h3>
			<div>
				<p>
					Start adding games to your Gameshelf, Favorites, or Wishlist—just hit
					the buttons!
				</p>
				<ul>
					<li>
						<img src={gameshelf} alt="gameshelf" width="25px" height="25px" />
						Gameshelf → Your personal collection.
					</li>
					<li>
						<img src={favorite} alt="favorite" width="25px" height="25px" />
						Favorites → The ones you can’t live without.
					</li>
					<li>
						<img src={wishlist} alt="wishlist" width="25px" height="25px" />
						Wishlist → Games you’re itching to play next.
					</li>
				</ul>
				<p>
					The more you add, the better your recommendations get—like a friend
					who just <span>gets</span> your taste. Plus, you’ll have all your
					games neatly in one place. Go on, start curating your dream gameshelf!
				</p>
			</div>
		</article>
	);
}

export default Tuto;

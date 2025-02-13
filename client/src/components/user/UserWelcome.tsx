import { Link } from "react-router-dom";
import type UserType from "../../interface/UserType";

import Avatar from "./Avatar";
import Top3 from "./Top3";

interface UserWelcomeProps {
	user: UserType;
}

const UserWelcome = ({ user }: UserWelcomeProps) => (
	<section className="content-box" id="user-welcome-box">
		<div id="user-welcome">
			<Avatar avatar={user.avatar} />
			<div>
				<h2>Welcome {user.pseudo}!</h2>
				<Link to={`/user/${user.id}/steam`}>Add my steam games</Link>
			</div>
		</div>

		{user.topGames && user.topGames.length > 0 && (
			<Top3 topGames={user.topGames} />
		)}
	</section>
);

export default UserWelcome;

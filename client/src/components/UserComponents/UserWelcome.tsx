import type UserType from "../../interface/UserType";
import Avatar from "../UserComponents/Avatar";
import Top3 from "../UserComponents/Top3";

interface UserWelcomeProps {
	user: UserType;
}

const UserWelcome = ({ user }: UserWelcomeProps) => (
	<section className="content-box" id="user-welcome-box">
		<div id="user-welcome">
			<Avatar avatar={user.avatar} />
			<h2>Welcome {user.pseudo}!</h2>
		</div>
		{user.topGames && <Top3 topGames={user.topGames} />}
	</section>
);

export default UserWelcome;

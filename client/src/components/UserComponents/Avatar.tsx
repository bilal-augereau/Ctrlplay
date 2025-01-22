import hat from "../../assets/images/avatar/avatarhat.png";
import isaac from "../../assets/images/avatar/avatarisaac.png";
import luigi from "../../assets/images/avatar/avatarluigi.png";
import pokeball from "../../assets/images/avatar/avatarpokeball.png";
import poule from "../../assets/images/avatar/avatarpoule.png";
import rayman from "../../assets/images/avatar/avatarrayman.png";
import sonic from "../../assets/images/avatar/avatarsonic.png";
import spiderman from "../../assets/images/avatar/avatarspiderman.png";

function Avatar({ avatar }: { avatar: string }) {
	const avatarsURL = {
		poule: poule,
		hat: hat,
		isaac: isaac,
		luigi: luigi,
		pokeball: pokeball,
		rayman: rayman,
		sonic: sonic,
		spiderman: spiderman,
	};

	return <img src={avatarsURL.poule} alt={avatar} />;
}

export default Avatar;

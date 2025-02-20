import batman from "../../assets/images/avatar/avatarbatman.png";
import donkeykong from "../../assets/images/avatar/avatardonkeykong.png";
import hat from "../../assets/images/avatar/avatarhat.png";
import isaac from "../../assets/images/avatar/avatarisaac.png";
import kirby from "../../assets/images/avatar/avatarkirby.png";
import lara from "../../assets/images/avatar/avatarlara.png";
import luigi from "../../assets/images/avatar/avatarluigi.png";
import mario from "../../assets/images/avatar/avatarmario.png";
import megaman from "../../assets/images/avatar/avatarmegaman.png";
import mk from "../../assets/images/avatar/avatarmk.png";
import peach from "../../assets/images/avatar/avatarpeach.png";
import pokeball from "../../assets/images/avatar/avatarpokeball.png";
import poule from "../../assets/images/avatar/avatarpoule.png";
import rayman from "../../assets/images/avatar/avatarrayman.png";
import umbrella from "../../assets/images/avatar/avatarresidentevil.png";
import sonic from "../../assets/images/avatar/avatarsonic.png";
import spiderman from "../../assets/images/avatar/avatarspiderman.png";
import thesims from "../../assets/images/avatar/avatarthesims.png";
import link from "../../assets/images/avatar/avatarzelda.png";

function Avatar({ avatar }: { avatar: string }) {
	const avatarsURL = {
		megaman: megaman,
		kirby: kirby,
		hat: hat,
		isaac: isaac,
		mario: mario,
		luigi: luigi,
		pokeball: pokeball,
		rayman: rayman,
		sonic: sonic,
		spiderman: spiderman,
		batman: batman,
		umbrella: umbrella,
		poule: poule,
		donkeykong: donkeykong,
		mk: mk,
		lara: lara,
		link: link,
		peach: peach,
		thesims: thesims,
	};

	return (
		<img src={avatarsURL[avatar as keyof typeof avatarsURL]} alt={avatar} />
	);
}

export default Avatar;

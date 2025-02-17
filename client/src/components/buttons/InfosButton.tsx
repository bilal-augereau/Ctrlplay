import { useNavigate } from "react-router-dom";

import "./InfosButton.css";

import infos from "../../assets/images/button_icons/infos.png";
import { useAuth } from "../../context/UserContext";

function InfosButton({ id }: { id: string }) {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleInfos = () => navigate(`/game/${id}`);

	return (
		<button
			type="button"
			className={`${user ? "beautiful-buttonadd" : "beautiful-button disconnected"} info-button`}
			onClick={handleInfos}
			title="More informations"
		>
			{user ? <img src={infos} alt="Infos" /> : <p>More infos</p>}
		</button>
	);
}

export default InfosButton;

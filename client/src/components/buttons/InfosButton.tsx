import { useNavigate } from "react-router-dom";

function InfosButton({ id }: { id: string }) {
	const navigate = useNavigate();

	const handleInfos = () => navigate(`/game/${id}`);

	return (
		<button
			type="button"
			className="beautiful-buttonadd"
			onClick={handleInfos}
			title="More informations"
		>
			i
		</button>
	);
}

export default InfosButton;

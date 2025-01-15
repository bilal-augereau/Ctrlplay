import { Link } from "react-router-dom";

function InfosButton({ id }: { id: string }) {
	return (
		<Link to={`/game/${id}`} className="beautiful-buttonadd">
			i
		</Link>
	);
}

export default InfosButton;

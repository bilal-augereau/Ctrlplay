import { useRef } from "react";
import type { FormEventHandler } from "react";
import GameShelfButton from "../components/GameShelfButton";

function Home() {
	const inputRef = useRef<HTMLInputElement>(null); // Ref pour accéder à l'input

	const handleSubmit: FormEventHandler = (event) => {
		event.preventDefault();

		// Obtenir la valeur de l'input
		const inputValue = inputRef.current?.value || "";

		// Liste des options disponibles
		const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

		// Valider si la valeur est dans les options
		if (!options.includes(inputValue)) {
			alert("Please select a valid option from the list.");
			return;
		}

		// Si la validation passe
		alert(`You selected: ${inputValue}`);
	};

	return (
		<div>
			<h1>Home Page</h1>
			<button className="beautiful-button" type="button">
				Login
			</button>
			<GameShelfButton gameId={1} userId={1} />

			<form id="myForm" onSubmit={handleSubmit}>
				<label htmlFor="suggestions">Choose an option:</label>
				<input
					list="options"
					id="suggestions"
					name="suggestions"
					required
					ref={inputRef} // Attacher la ref à l'input
				/>
				<datalist id="options">
					<option value="Apple">Apple</option>
					<option value="Banana">Banana</option>
					<option value="Cherry">Cherry</option>
					<option value="Date">Date</option>
					<option value="Elderberry">Elderberry</option>
				</datalist>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Home;

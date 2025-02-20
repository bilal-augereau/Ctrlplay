import "./PopUp.css";

function PopUp({
	setPopUp,
}: { setPopUp: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<section id="mobile-version" className="content-box">
			<p>
				Thank you for your visit! <br />
				The mobile version is not fully optimized yet. For the best experience,
				we recommend using a desktop. <br />
				Enjoy your adventure!
			</p>
			<button
				className="beautiful-button"
				type="button"
				onClick={() => setPopUp(false)}
				onKeyUp={() => setPopUp(false)}
			>
				Continue on mobile anyway
			</button>
		</section>
	);
}

export default PopUp;

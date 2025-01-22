import "./SignUp.css";
import leftarrowsignup from "../assets/images/button_icons/leftarrowsignup.png";
import rightarrowsignup from "../assets/images/button_icons/rightarrowsignup.png";
function SignUp() {
	return (
		<div id="main">
			<section className="content-box">
				<div className="content-boxsignup">
					<h1>Welcome new user!</h1>
					<p className="textsignup">
						Crtl+Play is a digital platform for gamers to organize their game
						collection. Sign up for free and start building your dream
						Gameshelf!
					</p>
					<div className="avatar">
						<img src={leftarrowsignup} alt="Left arrow for sign up" />
						<p className="textsignup">AVATAR</p>
						<img src={rightarrowsignup} alt="Right arrow for sign up" />
						<p className="textsignup">Choose your avatar</p>
					</div>
					<form className="formsignup">
						<div className="labelgroup">
							<label htmlFor="username">What should we call you ?</label>
							<input type="text" id="username" name="username" />
						</div>
						<div className="labelgroup">
							<label htmlFor="username">Choose a password</label>
							<input type="password" id="password" name="password" />
						</div>
						<div className="labelgroup">
							<label htmlFor="username">Confirm your password</label>
							<input
								type="password"
								id="passwordconfirmation"
								name="passwordconfirmation"
							/>
						</div>
					</form>
					<p className="textsignup">
						If you want to help us recommend you the right game, you can answer
						some questions about your gaming habits. You can also do it later on
						your profile page.
					</p>
				</div>
				<div className="buttons">
					<button className="beautiful-button" type="button">
						Complete my profile
					</button>
					<button className="beautiful-button" type="button">
						Just sign up for now
					</button>
				</div>
				<p className="textsignup">Already have an account ?</p>
			</section>
		</div>
	);
}

export default SignUp;

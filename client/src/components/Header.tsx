import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <header className="header">
      <div className="buttons">
        <button type="button" className="login-button" onClick={handleLogin}>
          <span>Login</span>
        </button>
        <button type="button" className="signup-button" onClick={handleSignUp}>
          <span>Sign Up</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

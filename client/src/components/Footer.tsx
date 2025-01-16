import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a
          href="https://persona.atlus.com/p5r/?lang=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="\images\button_icons\IM.png"
            alt="Icon Left"
            className="footer-icon"
          />
        </a>
      </div>

      <div className="footer-center">
        <button type="button" className="footer-icon-button">
          <img
            src="/path/to/your/image-center.png"
            alt="Icon Center"
            className="footer-icon"
          />
        </button>
      </div>

      <div className="footer-right">
        <p>About Us | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;

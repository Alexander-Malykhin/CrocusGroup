import "./Footer.css";
import logo from "../../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <a href="/" className="footer__logo image">
          <img src={logo} alt="Логотип CROCUS GROUP" />
        </a>
        <div className="footer__copyrigth">© 2024 CROCUS GROUP</div>
      </div>
    </footer>
  );
};

export default Footer;

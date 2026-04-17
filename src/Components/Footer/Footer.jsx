import "./Footer.css";
import logo from "../../assets/logo.webp";
import { useEffect, useState } from "react";

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const now = new Date();
        const nextYear = new Date(now.getFullYear() + 1, 0, 1);
        const msUntilNewYear = nextYear - now;

        const timer = setTimeout(() => {
            setYear(new Date().getFullYear());
        }, msUntilNewYear);

        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className="footer">
            <div className="container footer__container">
                <a href="/" className="footer__logo image">
                    <img src={logo} alt="Логотип CROCUS GROUP" />
                </a>
                <div className="footer__copyrigth">© {year} CROCUS GROUP</div>
            </div>
        </footer>
    );
};

export default Footer;

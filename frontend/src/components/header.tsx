import Logo from '../images/logo_bg.png';
import "../styles/headerstyles.css"
import {Link} from "react-router-dom";

const Header = () => {
    return (<div className="header-container">
        <div className="logo-block">
            <a href = "/" target="_blank" rel="noopener noreferrer" >
            <img src={Logo} className="logo-image" alt="logo" />
            </a>
            <span>Дизайн Бюро безопасных пространств</span>
            
        </div>
        <div className="routes">
            <Link to="/about">О нас</Link>
            <Link to="/projects">Проекты</Link>
            <Link to="/techSupport">Техническая поддержка</Link>
            <Link to="/contact">Контакты</Link>
        </div>
    </div>)
}

export default Header;
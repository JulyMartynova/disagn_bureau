import Logo from '../images/logo_bg.png';
import "../styles/headerstyles.css"
import {Link} from "react-router-dom";

const Header = () => {
    return (<div className="header-container">
        <div className="logo-block">
            <img src={Logo} className="logo-image" alt="logo" />
            <span>Дизайн Бюро безопасных пространств</span>
            
        </div>
        <div className="routes">
            <Link to="/about">О нас</Link>
            <Link to="/projects">Проекты</Link>
            <Link to="/techSupport">Техническая поддержка</Link>
            <Link to="/contacts">Контакты</Link>
        </div>
    </div>)
}

export default Header;
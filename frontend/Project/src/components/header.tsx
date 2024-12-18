import Logo from '../images/header_logo.png';
import "../styles/headerstyles.css"
import {Link} from "react-router-dom";

const Header = () => {
    return (<div className="header-container">
        <div className="logo-block">
            <img src={Logo} className="logo-image" alt="logo"/>
        </div>
        <div className="routes">
            <Link to="/">О нас</Link>
            <Link to="/">Проекты</Link>
            <Link to="/">Техническая поддержка</Link>
            <Link to="/">Контакты</Link>
        </div>
    </div>)
}

export default Header;
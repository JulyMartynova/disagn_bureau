import Footer from "../components/footer";
import Header from "../components/header";
// import { FaTelegram } from "react-icons/fa";

const ContactPage = () => {
    return (
        <div className="wrapper">
            <Header/>

            <div className="bg_scroll">
                <h1>Связаться с нами</h1>
                <div className="contact-info">
                    <p>
                    info@dbbp.ru
                    </p>
                    <a href="https://t.me/designAVS" target="_blank" rel="noopener noreferrer">
                    <button className = "telegram-button">
                    {/* <FaTelegram className="telegram-icon"/> */}
                    @designAVS</button>
                    </a>
                    <p>
                    +7 991 324 8458
                    <br></br>
                    <strong>
                       Генеральный Директор
                    </strong>
                    <br></br>
                    Антонов Виктор Сергеевич
                    
                    </p>
                    
                </div>
                
                    <embed
                        className="google-map"
                        title="Карта Google"
                        src="https://maps.google.com/maps?q=%D0%98%D0%BD%D0%BD%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%81%2C%20%D1%83%D0%BB.%20%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F%2C%207&amp;z=14&amp;hl=en&amp;t=m&amp;output=embed&amp;iwloc=near"
    
                    ></embed>
                
            </div>

            <Footer/>
        </div>
    );
};
export default ContactPage;
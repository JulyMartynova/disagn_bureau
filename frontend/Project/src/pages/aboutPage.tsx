import Footer from "../components/footer";
import Header from "../components/header";
import HeaderLogo from "../images/logo_bg.png";
import VS from "../images/victor.jpg"; // Предполагаем, что это изображение Виктора
import DA from "../images/Dimitriy.jpg"; // Предполагаем, что это изображение Дмитрия

const AboutPage = () => {
    return (
        <div className="wrapper">
            <Header />

            <div className="bg_scroll">
                <div className="logo">
                    <figure>
                        <img src={HeaderLogo} alt="logo" />
                        <figcaption>
                            Дизайн бюро безопасных
                            <br />
                            пространств
                        </figcaption>
                    </figure>
                </div>

                <p>
                    Наша компания занимается разработкой систем
                    <br />
                    коллективной безопасности и систем мониторинга и
                    <br />
                    наблюдения, которые могут использоваться как в
                    <br />
                    масштабах дома, небольшой территории или
                    <br />
                    промышленного предприятия, так и в масштабах
                    <br />
                    городской инфраструктуры.
                </p>

                <div className="team-container">
                    <h1>Наша команда</h1>
                    <div className="row-stuff">
                        <div className="teammate first">
                            <img src={VS} alt="Victor" />
                            <p><b>Антонов Виктор Сергеевич</b></p>
                            <p>Генеральный Директор</p>
                            <a href="https://t.me/designAVS" target="_blank" rel="noopener noreferrer">
                                <button></button>
                            </a>
                        </div>
                    </div>
                    <div className="row-stuff">
                        
                        <br></br>
                        <div className="teammate">
                            <img src={DA} alt="Dmitriy" />
                            <p><b>Андуков Дмитрий Алексеевич</b></p>
                            <p>Программист разработчик</p>
                            <a href="https://t.me/DistSdSd" target="_blank" rel="noopener noreferrer">
                                <button></button>
                            </a>
                        </div>

                        <div className="teammate">
                            <img src={DA} alt="Timur" />
                            <p><b>Хазиев Тимур Фаридович</b></p>
                            <p>Программист разработчик</p>
                            <a href="https://t.me/weqsif" target="_blank" rel="noopener noreferrer">
                                <button></button>
                            </a>
                        </div>

                        <div className="teammate">
                            <img src={DA} alt="Kirill" />
                            <p><b>Антонов Кирилл Викторович</b></p>
                            <p>Промышленный дизайн</p>
                            <a href="https://t.me/ghalliam" target="_blank" rel="noopener noreferrer">
                                <button></button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
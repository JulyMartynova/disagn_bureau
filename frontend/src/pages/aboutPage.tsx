import Footer from "../components/footer";
import Header from "../components/header";
import HeaderLogo from "../images/logo_bg.png";
import VS from "../images/victor.jpg"; // Предполагаем, что это изображение Виктора
import DA from "../images/Dimitriy.jpg"; // Предполагаем, что это изображение Дмитрия
import KV from "../images/kirill.jpg"
import TF from "../images/timur.jpg"
import React, { useEffect, useState } from 'react';
import tgIm from "../images/teleg.png"

const AboutPage = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false); // Состояние для видимости footer

    // Проверка положения скролла
    useEffect(() => {
        document.title = `DBBP - О нас`; // Устанавливаем заголовок страницы
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // Текущая позиция скролла
            const windowHeight = window.innerHeight; // Высота окна
            const documentHeight = document.documentElement.scrollHeight; // Общая высота документа

            // Если пользователь находится внизу страницы
            if (scrollTop + windowHeight >= documentHeight - 50) {
                setIsFooterVisible(true);
            } else {
                setIsFooterVisible(false);
            }
        };

        // Добавляем обработчик скролла
        window.addEventListener("scroll", handleScroll);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
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
                            <h3>Антонов Виктор Сергеевич</h3>
                            <p>Генеральный Директор</p>
                            <a href="https://t.me/designAVS" target="_blank" rel="noopener noreferrer">
                                <button>
                                    <img src ={tgIm} alt = "Tg Icon"/>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="row-stuff">
                        
                        <br></br>
                        <div className="teammate">
                            <img src={DA} alt="Dmitriy" />
                            <h3>Андуков Дмитрий Алексеевич</h3>
                            <p>Программист разработчик</p>
                            <a href="https://t.me/DistSdSd" target="_blank" rel="noopener noreferrer">
                                <button>
                                <img src ={tgIm} alt = "Tg Icon"/>
                                </button>
                            </a>
                        </div>

                        <div className="teammate">
                            <img src={TF} alt="Timur" />
                            <h3>Хазиев Тимур Фаридович</h3>
                            <p>Программист разработчик</p>
                            <a href="https://t.me/weqsif" target="_blank" rel="noopener noreferrer">
                                <button>
                                <img src ={tgIm} alt = "Tg Icon"/>
                                </button>
                            </a>
                        </div>

                        <div className="teammate">
                            <img src={KV} alt="Kirill" />
                            <h3>Антонов Кирилл Викторович</h3>
                            <p>Промышленный дизайн</p>
                            <a href="https://t.me/ghalliam" target="_blank" rel="noopener noreferrer">
                                <button>
                                <img src ={tgIm} alt = "Tg Icon"/>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {isFooterVisible && <Footer />}
        </div>
    );
};

export default AboutPage;
import React, { useEffect, useState } from 'react';
import { fetchPhotos, Projects } from '../api/imggetter'; // Используем fetchProject
import Footer from "../components/footer";
import Header from "../components/header";
import par1 from "../images/atomdate.png";
import par2 from "../images/robosoft.png";
import par3 from "../images/geopager.jpg";
import { useNavigate  } from 'react-router-dom';

const images = [
    par1, par2, par3,
];

const MainPage = () => {
    const [project, setProject] = useState<Projects | null>(null); // Состояние для текущего проекта
    const [loading, setLoading] = useState(false);
    const [currentId, setCurrentId] = useState(4); // Начальный ID = 4
    const [error, setError] = useState<string | null>(null); // Состояние для ошибки
    const [imageOrder, setImageOrder] = useState<string[]>(images); // Порядок изображений
    const [isFooterVisible, setIsFooterVisible] = useState(false); // Состояние для видимости footer
    const navigate = useNavigate();
    // Проверка положения скролла
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

    // Функция для циклического сдвига массива изображений
    const rotateImages = () => {
        setImageOrder((prevOrder) => {
            // Сдвигаем массив на одну позицию влево
            const newOrder = [...prevOrder.slice(1), prevOrder[0]];
            return newOrder;
        });
    };

    // Автоматическая прокрутка
    useEffect(() => {
        const intervalId = setInterval(() => {
            rotateImages(); // Сдвигаем изображения каждые 3 секунды
        }, 1000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    // Загрузка текущего проекта
    const loadProject = async (id: number) => {
        setLoading(true);
        setError(null); // Сбрасываем ошибку перед загрузкой
        try {
            const res = await fetchPhotos(id); // Загружаем проект по ID
            setProject(res); // Устанавливаем текущий проект
        } catch (err) {
            console.error("Ошибка при загрузке проекта:", err);
            setError("Не удалось загрузить проект. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    // Загружаем проект при изменении currentId
    useEffect(() => {
        loadProject(currentId);
    }, [currentId]);

    // Переход к следующему проекту
    const nextProject = () => {
        setCurrentId(currentId + 1); // Увеличиваем ID
    };

    // Переход к предыдущему проекту
    const prevProject = () => {
        if (currentId > 1) {
            setCurrentId(currentId - 1); // Уменьшаем ID
        }
    };
    const handleProjectClick = (projectName: string) => {
        const encodedProjectName = encodeURIComponent(projectName);
        navigate(`/projects/${encodedProjectName}`); // Переход на страницу проекта
    };

    return (
        <div className="wrapper">
            <Header />

            <div className="bg_scroll">
                <h1>Наши проекты</h1>
                <div className="projects-container">
                    {loading ? (
                        <div>Загрузка...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : project ? (
                        <>
                            <div className="project-image">
                                {/* Отображаем изображение в формате Base64 */}
                                <img src={`data:image/jpeg;base64,${project.Image}`} alt={project.Name} />
                            </div>
                            <h2 className="project-title">{project.Name}</h2>
                            <div className="project-description">{project.Description}</div>
                            <button className="project-button" onClick ={() => 
                                handleProjectClick(project.Name)}>Перейти</button>
                            
                        </>
                    ) : (
                        <div>Проект не найден</div>
                    )}

                    {/* Стрелки для переключения проектов */}
                    <div className="carousel-controls">
                        <button className="carousel-button left" onClick={prevProject}>←</button>
                        <button className="carousel-button right" onClick={nextProject}>→</button>
                    </div>
                </div>

                <div className="partner-container">
                    <h1>Наши партнеры</h1>
                    <div className="partner-items">
                        {/* Отображаем изображения в текущем порядке */}
                        {imageOrder.map((image, index) => (
                            <div key={index} className="partner-item">
                                <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isFooterVisible && <Footer />}
        </div>
    );
};

export default MainPage;
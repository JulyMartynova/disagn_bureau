import React, { useEffect, useState } from 'react';
import { fetchPhotos, Projects } from '../api/imggetter';
import Footer from "../components/footer";
import Header from "../components/header";
import par1 from "../images/atomdate.png";
import par2 from "../images/robosoft.png";
import par3 from "../images/geopager.jpg";
import { useNavigate } from 'react-router-dom';

const images = [par1, par2, par3];

const MainPage = () => {
    const [project, setProject] = useState<Projects | null>(null); // Состояние для текущего проекта
    const [loading, setLoading] = useState(false);
    const [currentId, setCurrentId] = useState(1); // Начальный ID = 1
    const [error, setError] = useState<string | null>(null);
    const [imageOrder, setImageOrder] = useState<string[]>(images);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const navigate = useNavigate();

    // Проверка положения скролла
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 50) {
                setIsFooterVisible(true);
            } else {
                setIsFooterVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Автоматическая прокрутка изображений
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageOrder((prevOrder) => [...prevOrder.slice(1), prevOrder[0]]);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Загрузка проекта по ID
    const loadProject = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchPhotos(id); // Загружаем проект по ID
            setProject(res);
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
        if (currentId < 3) { // Ограничиваем максимальный ID = 3
            setCurrentId(currentId + 1);
        }
    };

    // Переход к предыдущему проекту
    const prevProject = () => {
        if (currentId > 1) { // Ограничиваем минимальный ID = 1
            setCurrentId(currentId - 1);
        }
    };

    const handleProjectClick = (projectName: string) => {
        const encodedProjectName = encodeURIComponent(projectName);
        navigate(`/projects/${encodedProjectName}`);
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
                                <img src={`data:image/jpeg;base64,${project.Image}`} alt={project.Name} />
                            </div>
                            <h2 className="project-title">{project.Name}</h2>
                            <div className="project-description">{project.Description}</div>
                            <button className="project-button" onClick={() => handleProjectClick(project.Name)}>
                                Перейти
                            </button>
                        </>
                    ) : (
                        <div>Проект не найден</div>
                    )}

                    {/* Стрелки для переключения проектов */}
                    <div className="carousel-controls">
                        <button className="carousel-button left" onClick={prevProject} disabled={currentId === 1}>
                            ←
                        </button>
                        <button className="carousel-button right" onClick={nextProject} disabled={currentId === 3}>
                            →
                        </button>
                    </div>
                </div>

                <div className="partner-container">
                    <h1>Наши партнеры</h1>
                    <div className="partner-items">
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
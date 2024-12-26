import React, { useEffect, useState } from 'react';
import { fetchProjects, Projects } from '../api/projectgetter';
import Footer from "../components/footer";
import Header from "../components/header";
import { useNavigate } from 'react-router-dom'; // Для навигации

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Projects[] | null>(null);
    const [selectedProject, setSelectedProject] = useState<Projects | null>(null); // Состояние для выбранного проекта
    const navigate = useNavigate(); // Для навигации
    const [isFooterVisible, setIsFooterVisible] = useState(false); // Состояние для видимости footer
    useEffect(() => {
        document.title = `DBBP - Проекты`; // Устанавливаем заголовок страницы
    }, []);
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

    // Загрузка проектов
    useEffect(() => {
        const loadProjects = async () => {
            console.time("Загрузка проектов"); // Логирование времени загрузки
            try {
                const res = await fetchProjects();
                setProjects(res);
            } catch (err) {
                console.error("Ошибка при загрузке проектов:", err);
            } finally {
                console.timeEnd("Загрузка проектов"); // Логирование времени загрузки
            }
        };

        loadProjects();
    }, []);

    // Обработчик клика на изображение
    const handleImageClick = (projectName: string) => {
        // Преобразуем название проекта в URL-безопасный формат
        const encodedProjectName = encodeURIComponent(projectName);
        navigate(`/projects/${encodedProjectName}`); // Переход на страницу проекта по имени
    };

    // Функция для получения первого предложения описания
    const getFirstSentence = (description: string) => {
        const sentences = description.split('.'); // Разделяем текст на предложения
        return sentences[0].trim() + '.'; // Возвращаем первое предложение с точкой
    };

    return (
        <div className="wrapper">
            <Header />

            <div className="bg_scroll">
                <h1>Наши проекты</h1>

                {/* Отображение проектов в виде сетки */}
                <div className="projects-grid">
                    {projects ? (
                        projects.map((project) => (
                            <div
                                key={project.ID}
                                className="p-item"
                                onMouseEnter={() => setSelectedProject(project)} // Устанавливаем выбранный проект
                                onMouseLeave={() => setSelectedProject(null)} // Сбрасываем выбранный проект
                            >
                                <div
                                    className="p-image"
                                    onClick={() => handleImageClick(project.Name)} // Переход при клике на изображение
                                >
                                    <img
                                        src={`data:image/jpeg;base64,${project.Image}`}
                                        alt={project.Name}
                                    />
                                </div>
                                <h2>{project.Name}</h2>
                                {/* Описание при наведении */}
                                {selectedProject?.ID === project.ID && (
                                    <div className="p-description">
                                        {getFirstSentence(project.Description)}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>Загрузка проектов...</div>
                    )}
                </div>
            </div>

            {isFooterVisible && <Footer />}
        </div>
    );
};

export default ProjectsPage;
import Footer from "../components/footer";
import Header from "../components/header";
import React, { useState, useEffect } from "react";
import { fetchProjects, fetchProjectDetails, Project, ProjectDetails } from "../api/docsoftgetter";

const TechSupportPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
    const [documentationUrl, setDocumentationUrl] = useState<string>("");
    const [softwareUrl, setSoftwareUrl] = useState<string>("");
    const [buttonColors, setButtonColors] = useState<{ [key: number]: string }>({});
    const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей страницы с проектами

    // Загрузка списка проектов
    useEffect(() => {
        fetchProjects()
            .then((projects) => {
                setProjects(projects);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке проектов:", error);
            });
    }, []);

    // Обработчик выбора проекта
    const handleProjectClick = (projectId: number) => {
        // Сбрасываем выбранный проект, если нажата уже выбранная кнопка
        if (selectedProject && selectedProject.ID === projectId) {
            setSelectedProject(null);
            setDocumentationUrl("");
            setSoftwareUrl("");
            setButtonColors((prevColors) => ({
                ...prevColors,
                [projectId]: "", // Сбрасываем цвет кнопки (пустая строка)
            }));
            return;
        }

        // Загружаем данные о проекте
        fetchProjectDetails(projectId)
            .then((data) => {
                setSelectedProject(data);
                setDocumentationUrl(data.documentation.Url);
                setSoftwareUrl(data.software.Url);
                setButtonColors((prevColors) => ({
                    ...prevColors,
                    [projectId]: "rgb(177, 214, 117)", // Устанавливаем зеленый цвет для кнопки
                }));
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных проекта:", error);
            });
    };

    // Обработчик переключения на следующую страницу
    const handleNext = () => {
        if (currentIndex + 2 < projects.length) {
            setCurrentIndex(currentIndex + 2);
        }
    };

    // Обработчик переключения на предыдущую страницу
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 2);
        }
    };

    return (
        <div className="wrapper">
            <Header />

            <div className="bg_scroll">
                <h1>Техническая поддержка</h1>

                {/* Кнопки проектов и переключения */}
                <div className="support-buttons-container">
                    {/* Кнопки переключения */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="carousel-button left" // Уникальный класс для кнопок переключения
                    >
                        ←
                    </button>

                    {/* Кнопки проектов */}
                    {projects.slice(currentIndex, currentIndex + 2).map((project) => (
                        <button
                            key={project.ID}
                            onClick={() => handleProjectClick(project.ID)}
                            style={{ backgroundColor: buttonColors[project.ID] || "rgb(243, 243, 243)" }}
                            className="support-button" // Уникальный класс для кнопок проектов
                        >
                            {project.Name}
                        </button>
                    ))}

                    {/* Кнопки переключения */}
                    <button
                        onClick={handleNext}
                        disabled={currentIndex + 2 >= projects.length}
                        className="carousel-button right" // Уникальный класс для кнопок переключения
                    >
                        →
                    </button>
                </div>

                {/* Ограниченное поле с двумя рядами (как на странице main) */}
                {selectedProject && (
                    <div className="details-container">
                        <div className="details">
                            <div className="details-row">
                                <span>Техническая документация:</span>
                                <a href={documentationUrl} download>
                                    <button className="download-button">Скачать</button>
                                </a>
                            </div>
                            <div className="details-row">
                                <span>Программное обеспечение:</span>
                                <a href={softwareUrl} download>
                                    <button className="download-button">Скачать</button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default TechSupportPage;
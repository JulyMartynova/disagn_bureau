import React, { useState, useEffect, useRef } from "react";
import { fetchProjects, fetchProjectDetails, Project, ProjectDetails } from "../api/docsoftgetter";
import Footer from "../components/footer";
import Header from "../components/header";

const TechSupportPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
    const [selectedProjectName, setSelectedProjectName] = useState<string>(""); // Имя выбранного проекта
    const [documentationUrl, setDocumentationUrl] = useState<string>("");
    const [softwareUrl, setSoftwareUrl] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isFooterVisible, setIsFooterVisible] = useState(false); // Состояние для видимости footer

    useEffect(() => {
        document.title = `DBBP - Тех. Поддержка`; // Устанавливаем заголовок страницы
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

    // Загрузка списка проектов
    useEffect(() => {
        fetchProjects()
            .then((projects) => {
                setProjects(projects);
                console.log("Проекты загружены:", projects); // Отладка
            })
            .catch((error) => {
                console.error("Ошибка при загрузке проектов:", error);
            });
    }, []);

    // Обработчик выбора проекта
    const handleProjectSelect = (projectId: number) => {
        // Загружаем данные о проекте
        fetchProjectDetails(projectId)
            .then((data) => {
                if (!data) {
                    console.error("Данные проекта не найдены");
                    return;
                }

                setSelectedProject(data);
                console.log("Выбран проект:", data); // Отладка

                // Находим проект в массиве projects по ID и сохраняем его имя
                const projectName = projects.find(project => project.ID === projectId)?.Name || "Выбран проект";
                setSelectedProjectName(projectName);
                setSearchQuery(projectName);

                setDocumentationUrl(data.documentation.Url);
                setSoftwareUrl(data.software.Url);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных проекта:", error);
            });

        setIsDropdownOpen(false); // Закрываем выпадающий список
    };
    const toCutDoc = documentationUrl.lastIndexOf('/');
    const docName = documentationUrl.substring(toCutDoc + 1);
    const toCutSoft = softwareUrl.lastIndexOf('/');
    const softName = softwareUrl.substring(toCutSoft + 1);
    // Обработчик сброса выбранного проекта
    const handleResetProject = () => {
        setSelectedProject(null); // Сбрасываем выбранный проект
        setSelectedProjectName(""); // Сбрасываем имя проекта
        setDocumentationUrl(""); // Сбрасываем URL документации
        setSoftwareUrl(""); // Сбрасываем URL ПО
    };

    // Фильтрация проектов по поисковому запросу
    const filteredProjects = projects.filter((project) =>
        project.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Закрытие выпадающего списка при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="wrapper">
            <Header />

            <div className="bg_scroll">
                <h1>Техническая поддержка</h1>

                {/* Выпадающий список с поиском */}
                <div className="custom-select-container" ref={dropdownRef}>
                    <input
                        type="text"
                        placeholder="Выберите проект..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="custom-select-input"
                    />

                    {isDropdownOpen && (
                        <div className="custom-dropdown">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <button
                                        key={project.ID}
                                        onClick={() => handleProjectSelect(project.ID)}
                                        className="custom-dropdown-item"
                                    >
                                        {project.Name}
                                    </button>
                                ))
                            ) : (
                                <div className="custom-dropdown-item">Нет результатов</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Ограниченное поле с двумя рядами (как на странице main) */}
                {selectedProject && selectedProject.ID &&(
                    <div className="details-container">
                        <div className="details">
                            <div className="details-row">
                                <span>Техническая документация:</span>
                                <a  href={`https://dbbp.ru/api/supportService/download/documentation/${selectedProject.ID}`}
        download = {docName}>
                                    <button className="download-button">Скачать</button>
                                </a>
                            </div>
                            <div className="details-row">
                                <span>Программное обеспечение:</span>
                                <a href={`https://dbbp.ru/api/supportService/download/software/${selectedProject.ID}`} download = {softName}>
                                    <button className="download-button">Скачать</button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isFooterVisible && <Footer />}
        </div>
    );
};

export default TechSupportPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectIdByName, fetchPhotos, Projects } from '../api/imggetter';
import Footer from '../components/footer';
import Header from '../components/header';

const ProjectPage = () => {
    const { projectName } = useParams(); // Получаем projectName из URL
    const [project, setProject] = useState<Projects | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        document.title = `DBBP - ${projectName}`; // Устанавливаем заголовок страницы
    }, []);
    useEffect(() => {
        console.log("Имя проекта из URL:", projectName); // Логируем имя проекта

        if (!projectName) {
            setError("Имя проекта не указано");
            setLoading(false);
            return;
        }

        const fetchProjectData = async () => {
            try {
                // Получаем projectId по projectName
                const projectId = await fetchProjectIdByName(projectName);

                // Проверяем, что projectId является числом
                if (isNaN(projectId)) {
                    setError("Некорректный идентификатор проекта");
                    setLoading(false);
                    return;
                }

                // Загружаем данные проекта с помощью fetchPhotos
                const data = await fetchPhotos(projectId);
                setProject(data);
            } catch (err) {
                console.error("Ошибка при загрузке проекта", err);
                setError("Не удалось загрузить проект");
            } finally {
                setLoading(false); // Устанавливаем loading в false в любом случае
            }
        };

        fetchProjectData();
    }, [projectName]);

    useEffect(() => {
        console.log("Состояние проекта:", project); // Логируем состояние проекта
    }, [project]);

    useEffect(() => {
        console.log("Состояние загрузки:", loading); // Логируем состояние загрузки
    }, [loading]);

    useEffect(() => {
        console.log("Состояние ошибки:", error); // Логируем состояние ошибки
    }, [error]);

    return (
        <div className="wrapper">
            <Header />
            <div className="bg_scroll">
                {loading ? (
                    <p>Загрузка проекта...</p>
                ) : error ? (
                    <h1>{error}</h1>
                ) : project ? (
                    <>
                        <h1>{project.Name}</h1>
                        <div className="projects-container">
                            <div className="project-image">
                                <img
                                    src={`data:image/jpeg;base64,${project.Image}`}
                                    alt={project.Name}
                                />
                            </div>
                            <div className="project-description">
                                <p>{project.Description}</p>
                            </div>
                        </div>
                       
                       
                    </>
                ) : (
                    <h1>Проект не найден</h1>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProjectPage;
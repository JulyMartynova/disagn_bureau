import React, {useEffect, useState} from 'react';
import {fetchPhotos, Projects} from '../api/imggetter';
import Footer from "../components/footer";
import Header from "../components/header";

const MainPage = () => {
    const [project, setProject] = useState<Projects>();
    const [loading, setLoading] = useState(false);
    const [currentId, setCurrentId] = useState(1);

    const loadProject = async (id: number) => {
        setLoading(true);
        // try {
        //     const res = await fetchPhotos(id);
        //     setProject(res);
        // } catch (err) {
        //     console.error("Ошибка при загрузке проекта:", err);
        // } finally {
        //     setLoading(false);
        // }
    };

    useEffect(() => {
        loadProject(currentId);
    }, []);

    const nextProject = () => {
        const newId = currentId + 1 > 3 ? 1 : currentId + 1;
        setCurrentId(newId);
        loadProject(newId);
    };

    const prevProject = () => {
        const newId = currentId - 1 < 1 ? 3 : currentId - 1;
        setCurrentId(newId);
        loadProject(newId);
    };

    return (
        <div className="wrapper">
            <Header/>

            <div className="bg_scroll">
                <h1>Наши проекты</h1>
                <div className="projects-container">
                    {loading ? (
                        <div>Загрузка...</div>
                    ) : project ? (
                        <>
                            {/* <div className="project-image">
                                <img src={project.Image} alt={project.title}/>
                            </div> */}
                            <h2>{project.Name}</h2>
                            {/* <span className="project-decription">{project.description}</span> */}
                            <button className="project-button">Перейти</button>
                        </>
                    ) : (
                        <div>Ошибка загрузки проекта</div>
                    )}

                    {/* Стрелки */}
                    <div className="carousel-controls">
                        <button className="carousel-button left" onClick={prevProject}>←</button>
                        <button className="carousel-button right" onClick={nextProject}>→</button>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default MainPage;

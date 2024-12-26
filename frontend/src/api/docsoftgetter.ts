import axios from "axios";

// Определение типов
export interface Project {
    ID: number;
    Name: string;
}

export interface ProjectDetails {
    ID: number;
    documentation: {
        Url: string;
    };
    software: {
        Url: string;
    };
}

// Функция для получения списка проектов
export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await axios.get<{ projects: Project[] }>("http://localhost:8082/support"); // Указываем тип ответа
        return response.data.projects; // Возвращаем список проектов
    } catch (error) {
        console.error("Ошибка при загрузке проектов:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};

export const fetchProjectDetails = async (projectId: number): Promise<ProjectDetails> => {
    try {
        const response = await axios.get<ProjectDetails>(`http://localhost:8082/support/${projectId}`); 
        return response.data; // Возвращаем данные о проекте
    } catch (error) {
        console.error("Ошибка при загрузке данных проекта:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};
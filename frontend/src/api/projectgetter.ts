import axios from "axios";
import { BASE_URL } from "./api";

export interface Projects {
    ID: number;
    Image: string; // Изображение в формате Base64
    Name: string;
    Description: string;
}

export const fetchProjects = async (): Promise<Projects[]> => {
    try {
        const response = await axios.get<Projects[]>("http://localhost:8081/projects");
        return response.data; // Возвращаем массив проектов
    } catch (error) {
        console.error("Ошибка при загрузке проектов:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};
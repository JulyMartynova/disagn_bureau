import axios from "axios";
import { BASE_URL } from "./api";

export interface Projects {
    ID: number;
    Image: string; // Изображение в формате Base64
    Name: string;
    Description: string;
}

export const fetchPhotos = async (currID: number) => {
    try {
        const endpoint = BASE_URL + '/' + currID.toString();
        const response = await axios.get<Projects>(endpoint);
        console.log("Запрос на сервер:", endpoint);
        // Создаем объект с данными
        const everything: Projects = {
            ID: response.data.ID,
            Image: response.data.Image, // Изображение в формате Base64
            Name: response.data.Name,
            Description: response.data.Description,
        };

        // Добавляем Base64 изображение в объект (если нужно)
        (everything as any).base64Image = response.data.Image;

        return everything;
    } catch (error) {
        throw error;
    }
};
interface ProjectResponse {
    ID: number;
    Name: string;
}

export const fetchProjectIdByName = async (projectName: string): Promise<number> => {
    try {
        const encodedProjectName = encodeURIComponent(projectName);
        const response = await fetch(`${BASE_URL}/name/${encodedProjectName}`);
        if (!response.ok) {
            const errorText = await response.text(); // Получаем текст ошибки
            console.error("Ошибка от сервера:", errorText);
            throw new Error(`Ошибка при получении projectId: ${response.statusText}`);
        }

        const data = await response.json();

        // Проверяем, что projectId существует и является числом
        if (!data.ID || isNaN(data.ID)) {
            throw new Error("Некорректный projectId");
        }

        return data.ID;
    } catch (error) {
        console.error(`Ошибка при получении projectId для проекта "${projectName}":`, error);
        throw error;
    }
};
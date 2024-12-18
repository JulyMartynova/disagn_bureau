import axios from "axios";
import {BASE_URL} from "./api";

export interface Projects {
    //Image: string;
    Name: string;
    //Description: string;
}


export const fetchPhotos = async (currID: number) => {
    try {
        const endpoint = BASE_URL + currID.toString();
        const response = await axios.get<Projects>(endpoint, {});
        const everything: Projects = response.data;
        return everything;
    } catch (error) {
        throw error;
    }
}
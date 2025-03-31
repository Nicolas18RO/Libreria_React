import api from "../../../api/axios";
import { Editorial } from "../types/types";

//GET EDITORIAL
export const getEditorial = async (): Promise<Editorial[]> => {
    const response = await api.get<Editorial[]>('editoriales/');
    console.log("API Response GetAutor:", response.data); 
    return response.data;
};


//CREATE EDITORIAL
export const createEditorial = async(editorial: Omit<Editorial, 'id_Editorial'>):Promise<Editorial> =>{
    const response = await api.post<Editorial>('editoriales/', editorial);
    console.log('API Response CreateEditorial:', response.data);
    return response.data;
};

//UPDATE EDITORIAL
export const updateEditorial = async(id_Editorial: number, editorial: Partial<Editorial>): Promise<Editorial> => {
    const response = await api.put<Editorial>(`editoriales/${id_Editorial}/`, editorial);
    console.log('API Response UpdateEditorial:', response.data);
    return response.data;   
};

//DELETE EDITORIAL
export const deleteEditorial = async(id_Editorial: number): Promise<void> =>{
    const response = await api.delete(`editoriales/${id_Editorial}/`)
    console.log('API Response DeleteEditorial:', response.data);
    return response.data;
};

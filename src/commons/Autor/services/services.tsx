import api from "../../../api/axios";
import { Autor } from "../types/types";

export const getAutor = async (): Promise<Autor[]> => {
    const response = await api.get<Autor[]>('autores/');
    console.log("API Response GetAutor:", response.data); 
    return response.data;
};


//CREATE AUTOR
export const createAutor = async(autor: Omit<Autor, 'id_autor'>):Promise<Autor> =>{
    const response = await api.post<Autor>('autores/', autor);
    console.log('API Response CreateAutor:', response.data);
    return response.data;
};

//UPDATE AUTOR
export const updateAutor = async(id_autor: number, autor: Partial<Autor>): Promise<Autor> => {
    const response = await api.put<Autor>(`autores/${id_autor}/`, autor);
    console.log('API Response UpdateAutor:', response.data);
    return response.data;   
};

//DELETE AUTOR
export const deleteAutor = async(id_autor: number): Promise<void> =>{
    const response = await api.delete(`autores/${id_autor}/`)
    console.log('API Response DeleteAutor:', response.data);
    return response.data;
};

import api from "../../../api/axios";
import { Libro } from "../types/types";

//GET EDITORIAL
export const getLibro = async (): Promise<Libro[]> => {
    const response = await api.get<Libro[]>('libros/');
    console.log("API Response GetLibro:", response.data); 
    return response.data;
};


//CREATE EDITORIAL
export const createLibro = async(libro: Omit<Libro, 'id_libro'>):Promise<Libro> =>{
    const response = await api.post<Libro>('libros/', libro);
    console.log('API Response CreateLibro:', response.data);
    return response.data;
};

//UPDATE EDITORIAL
export const updateLibro = async(id_libro: number, libro: Partial<Libro>): Promise<Libro> => {
    const response = await api.put<Libro>(`libros/${id_libro}/`, libro);
    console.log('API Response UpdateLibro:', response.data);
    return response.data;   
};

//DELETE EDITORIAL
export const deleteLibro = async(id_libro: number): Promise<void> =>{
    const response = await api.delete(`libros/${id_libro}/`)
    console.log('API Response DeleteLibro:', response.data);
    return response.data;
};

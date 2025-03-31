import api from "../../../api/axios";
import { Prestamo } from "../types/types";

//GET EDITORIAL
export const getPrestamo = async (): Promise<Prestamo[]> => {
    const response = await api.get<Prestamo[]>('prestamos/');
    console.log("API Response GetPrestamo:", response.data); 
    return response.data;
};


//CREATE EDITORIAL
export const createPrestamo = async(prestamo: Omit<Prestamo, 'Id_prestamo'>):Promise<Prestamo> =>{
    const response = await api.post<Prestamo>('prestamos/', prestamo);
    console.log('API Response CreatePrestamo:', response.data);
    return response.data;
};

//UPDATE EDITORIAL
export const updatePrestamo = async(Id_prestamo: number, prestamo: Partial<Prestamo>): Promise<Prestamo> => {
    const response = await api.put<Prestamo>(`prestamos/${Id_prestamo}/`, prestamo);
    console.log('API Response UpdatePrestamo:', response.data);
    return response.data;   
};

//DELETE EDITORIAL
export const deletePrestamo = async(Id_prestamo: number): Promise<void> =>{
    const response = await api.delete(`prestamos/${Id_prestamo}/`)
    console.log('API Response DeletePrestamo:', response.data);
    return response.data;
};

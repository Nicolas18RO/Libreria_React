import api from "../../../api/axios";
import { Miembro } from "../types/types";

//GET EDITORIAL
export const getMiembro = async (): Promise<Miembro[]> => {
    const response = await api.get<Miembro[]>('miembros/');
    console.log("API Response GetMiembro:", response.data); 
    return response.data;
};


//CREATE EDITORIAL
export const createMiembro = async(miembro: Omit<Miembro, 'Id_miembro'>):Promise<Miembro> =>{
    const response = await api.post<Miembro>('miembros/', miembro);
    console.log('API Response CreateMiembro:', response.data);
    return response.data;
};

//UPDATE EDITORIAL
export const updateMiembro = async(Id_miembro: number, miembro: Partial<Miembro>): Promise<Miembro> => {
    const response = await api.put<Miembro>(`miembros/${Id_miembro}/`, miembro);
    console.log('API Response UpdateMiembro:', response.data);
    return response.data;   
};

//DELETE EDITORIAL
export const deleteMiembro = async(Id_miembro: number): Promise<void> =>{
    const response = await api.delete(`miembros/${Id_miembro}/`)
    console.log('API Response DeleteMiembro:', response.data);
    return response.data;
};

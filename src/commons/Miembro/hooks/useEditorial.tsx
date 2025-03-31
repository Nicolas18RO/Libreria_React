
import { Miembro } from "../types/types";
import { getMiembro } from "../services/services";
import { useEffect, useState } from "react";

const useMiembro = () =>{
    const [miembros, setMiembros] = useState<Miembro[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMiembro = async()=>{
        setLoading(true);
        try {
            const data = await getMiembro();
            setMiembros(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los datos')
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchMiembro()

    }, []);

    return {miembros, loading, error, refresh: fetchMiembro}
}

export default useMiembro;
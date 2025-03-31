
import { Prestamo } from "../types/types";
import { getPrestamo } from "../services/services";
import { useEffect, useState } from "react";

const usePrestamo = () =>{
    const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrestamo = async()=>{
        setLoading(true);
        try {
            const data = await getPrestamo();
            setPrestamos(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los datos')
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchPrestamo()

    }, []);

    return {prestamos, loading, error, refresh: fetchPrestamo}
}

export default usePrestamo;

import { Libro } from "../types/types";
import { getLibro } from "../services/services";
import { useEffect, useState } from "react";

const useLibro = () =>{
    const [libros, setLibros] = useState<Libro[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLibros = async()=>{
        setLoading(true);
        try {
            const data = await getLibro();
            setLibros(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los datos')
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchLibros()

    }, []);

    return {libros, loading, error, refresh: fetchLibros}
}

export default useLibro;
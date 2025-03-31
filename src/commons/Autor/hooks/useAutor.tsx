
import { Autor } from "../types/types";
import { getAutor } from "../services/services";
import { useEffect, useState } from "react";

const useAutor = () =>{
    const [autores, setAutores] = useState<Autor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAutores = async()=>{
        setLoading(true);
        try {
            const data = await getAutor();
            setAutores(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los datos')
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchAutores()

    }, []);

    return {autores, loading, error, refresh: fetchAutores}
}

export default useAutor;
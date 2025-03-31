
import { Editorial } from "../types/types";
import { getEditorial } from "../services/services";
import { useEffect, useState } from "react";

const useEditorial = () =>{
    const [editoriales, setEditoriales] = useState<Editorial[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEditoriales = async()=>{
        setLoading(true);
        try {
            const data = await getEditorial();
            setEditoriales(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los datos')
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchEditoriales()

    }, []);

    return {editoriales, loading, error, refresh: fetchEditoriales}
}

export default useEditorial;
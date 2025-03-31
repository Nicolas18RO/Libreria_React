
export interface Libro {
    id_libro?: number;
    titulo_libro: string;
    resumen_libro: string;
    ISBN_libro: string;
    aniopublicacion_libro: string; 
    
    // FOREIGN KEYS
    autor: number;
    editorial: number;
}

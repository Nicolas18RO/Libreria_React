import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Alert, CircularProgress, Box, Tooltip, IconButton} from '@mui/material';
import { Libro } from "../types/types";
import { Delete, Edit } from '@mui/icons-material';

interface ListLibrosTableProps {
  libros: Libro[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onEdit: (autor: Libro) => void;
  onDelete: (id: number) => void;
}

export default function ListLibroTable({ libros, loading, error, onEdit, onDelete}: ListLibrosTableProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titulo', headerName: 'Titulo', width: 130 },
    { field: 'resumen', headerName: 'Resumen', width: 130 },
    { field: 'isbn', headerName: 'ISBN', width: 230 },
    { field: 'anio', headerName: 'Año Publicacion', width: 230 },
    { field: 'autor', headerName: 'Autor', width: 230 },
    { field: 'editorial', headerName: 'Editorial', width: 230 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const libroData: Libro = {
          id_libro: params.row.id,
          titulo_libro: params.row.titulo,
          resumen_libro: params.row.resumen,
          ISBN_libro: params.row.isbn,
          aniopublicacion_libro: params.row.anio,
          autor: params.row.autor,
          editorial: params.row.editorial,
        };
        
        return (
          <>
            <Tooltip title="Editar">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(libroData);
                }}
              >
                <Edit color="primary" fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(params.row.id);
                }}
              >
                <Delete color="error" fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },

  ];

  
  const rows = libros.map((libro) => ({
    id: libro.id_libro,
    titulo: libro.titulo_libro,
    resumen: libro.resumen_libro,
    isbn: libro.ISBN_libro,
    anio: libro.aniopublicacion_libro,
    autor: libro.autor,
    editorial: libro.editorial,
  }));
  
  return (
    <Paper sx={{ height: 400, width: '100%', p: 2 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100% - 56px)">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100% - 56px)">
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
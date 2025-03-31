import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Alert, CircularProgress, Box, Tooltip, IconButton} from '@mui/material';
import { Autor } from "../types/types";
import { Delete, Edit } from '@mui/icons-material';

interface ListAutorsTableProps {
  autores: Autor[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onEdit: (autor: Autor) => void;
  onDelete: (id: number) => void;
}

export default function ListAutorsTable({ autores, loading, error, onEdit, onDelete}: ListAutorsTableProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'apellido', headerName: 'Apellido', width: 130 },
    { field: 'biografia', headerName: 'Biografia', width: 230 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const autorData: Autor = {
          id_autor: params.row.id,
          nombre_Autor: params.row.nombre,
          apellido_Autor: params.row.apellido,
          biografia_Autor: params.row.biografia
        };
        
        return (
          <>
            <Tooltip title="Editar">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(autorData);
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

  
  const rows = autores.map((autor) => ({
    id: autor.id_autor,
    nombre: autor.nombre_Autor,
    apellido: autor.apellido_Autor,
    biografia: autor.biografia_Autor,
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
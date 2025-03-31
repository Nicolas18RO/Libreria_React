import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Alert, CircularProgress, Box, Tooltip, IconButton} from '@mui/material';
import { Editorial } from "../types/types";
import { Delete, Edit } from '@mui/icons-material';

interface ListEditorialTableProps {
  editoriales: Editorial[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onEdit: (autor: Editorial) => void;
  onDelete: (id: number) => void;
}

export default function ListEditorialTable({ editoriales, loading, error, onEdit, onDelete}: ListEditorialTableProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'direccion', headerName: 'Direccion', width: 130 },
    { field: 'telefono', headerName: 'Telefono', width: 230 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const editorialData: Editorial = {
          id_Editorial: params.row.id,
          nombre_Editorial: params.row.nombre,
          direccion_Editorial: params.row.direccion,
          telefono_Editorial: params.row.telefono
        };
        
        return (
          <>
            <Tooltip title="Editar">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(editorialData);
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

  
  const rows = editoriales.map((editorial) => ({
    id: editorial.id_Editorial,
    nombre: editorial.nombre_Editorial,
    direccion: editorial.direccion_Editorial,
    telefono: editorial.telefono_Editorial,
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
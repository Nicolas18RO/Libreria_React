import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Alert, CircularProgress, Box, Tooltip, IconButton} from '@mui/material';
import { Miembro } from "../types/types";
import { Delete, Edit } from '@mui/icons-material';

interface ListMiembroTableProps {
  miembros: Miembro[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onEdit: (autor: Miembro) => void;
  onDelete: (id: number) => void;
}

export default function ListMiembroTable({ miembros, loading, error, onEdit, onDelete}: ListMiembroTableProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'apellido', headerName: 'Apellido', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'fechaMembresia', headerName: 'Fecha Membresia', width: 230 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const miembroData: Miembro = {
          Id_miembro: params.row.id,
          nombre_miembro: params.row.nombre,
          apellido_miembro: params.row.apellido,
          email_Mienbro: params.row.email,
          fechamembresia: params.row.fechaMembresia,

        };
        
        return (
          <>
            <Tooltip title="Editar">
              <IconButton 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(miembroData);
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

  
  const rows = miembros.map((miembro) => ({
    id: miembro.Id_miembro,
    nombre: miembro.nombre_miembro,
    apellido: miembro.apellido_miembro,
    email: miembro.email_Mienbro,
    fechaMembresia: miembro.fechamembresia,
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
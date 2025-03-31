import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Alert, CircularProgress, Box, Tooltip, IconButton} from '@mui/material';
import { Prestamo } from "../types/types";
import { Delete, Edit } from '@mui/icons-material';

interface ListPrestamoTableProps {
  prestamos: Prestamo[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  onEdit: (prestamo: Prestamo) => void;
  onDelete: (id: number) => void;
}

export default function ListPrestamoTable({ prestamos, loading, error, onEdit, onDelete}: ListPrestamoTableProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fecha_prestamo', headerName: 'Fecha Prestamo', width: 130 },
    { field: 'fecha_devolucion', headerName: 'Fecha Devolucion', width: 130 },
    { field: 'libro', headerName: 'Libro', width: 230 },
    { field: 'miembro', headerName: 'Miembro', width: 230 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const miembroData: Prestamo = {
          Id_prestamo: params.row.id,
          fecha_prestamo: params.row.fecha_prestamo,
          fecha_devolucion: params.row.fecha_devolucion,
          libro: params.row.libro,
          miembro: params.row.miembro,

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

  
  const rows = prestamos.map((prestamo) => ({
    id: prestamo.Id_prestamo,
    fecha_prestamo: prestamo.fecha_prestamo,
    fecha_devolucion: prestamo.fecha_devolucion,
    libro: prestamo.libro,
    miembro: prestamo.miembro,
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
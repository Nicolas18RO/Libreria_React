import { Box, Button, Typography} from "@mui/material";
import ListPrestamoTable from "../components/Table_ListPrestamo";
import PrestamoModal from "../components/CreatePrestamo";
import { Prestamo } from "../types/types";
import usePrestamo from "../hooks/usePrestamo";
import { useState } from "react";
import { deletePrestamo } from "../services/services"; 
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const PrestamoScreen: React.FC = () => {
    const {prestamos, loading, error, refresh } = usePrestamo();
    const [modalOpen, setModalOpen] = useState(false);
    const [prestamoToEdit, setPrestamoToEdit] = useState<Prestamo | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [prestamoToDelete, setPrestamoToDelete] = useState<number | null>(null);

    const handleCreate = () => {
        setPrestamoToEdit(null);
        setModalOpen(true);
    };

    const handleEdit = (prestamo: Prestamo) => {
        setPrestamoToEdit(prestamo);
        setModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setPrestamoToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (prestamoToDelete) {
            try {
                await deletePrestamo(prestamoToDelete);
                refresh();
                setDeleteDialogOpen(false);
            } catch (err) {
                console.error("Error Deleting Prestamo:", err);
            }
        }
    };

    const handleSuccess = () => {
        refresh();
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setPrestamoToEdit(null);
    };

    return (
        <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
            <Typography variant="h4" color="success" align="center" fontWeight='bold'>
                Prestamos
            </Typography>
            <ListPrestamoTable 
                prestamos={prestamos} 
                loading={loading} 
                error={error} 
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />
            
            <PrestamoModal
                open={modalOpen}
                initialData={prestamoToEdit || undefined}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Crear Prestamo
                </Button>
            </Box>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar este prestamo? Esta acción no se puede deshacer."
                onCancel={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </Box>
    );
};

export default PrestamoScreen;
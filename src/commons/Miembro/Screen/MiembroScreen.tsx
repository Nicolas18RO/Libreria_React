import { Box, Button, Typography} from "@mui/material";
import ListEditorialTable from "../components/Table_ListMiembro";
import EditorialModal from "../components/CreateMiembro";
import { Miembro } from "../types/types";
import useMiembro from "../hooks/useEditorial";
import { useState } from "react";
import { deleteMiembro } from "../services/services"; 
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const MiembroScreen: React.FC = () => {
    const { miembros, loading, error, refresh } = useMiembro();
    const [modalOpen, setModalOpen] = useState(false);
    const [miembroToEdit, setMiembroToEdit] = useState<Miembro | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [miembroToDelete, setMiembroToDelete] = useState<number | null>(null);

    const handleCreate = () => {
        setMiembroToEdit(null);
        setModalOpen(true);
    };

    const handleEdit = (miembro: Miembro) => {
        setMiembroToEdit(miembro);
        setModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setMiembroToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (miembroToDelete) {
            try {
                await deleteMiembro(miembroToDelete);
                refresh();
                setDeleteDialogOpen(false);
            } catch (err) {
                console.error("Error Deleting Editorial:", err);
            }
        }
    };

    const handleSuccess = () => {
        refresh();
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setMiembroToEdit(null);
    };

    return (
        <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
            <Typography variant="h4" color="success" align="center" fontWeight='bold'>
                Miembros
            </Typography>
            <ListEditorialTable 
                miembros={miembros} 
                loading={loading} 
                error={error} 
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />
            
            <EditorialModal
                open={modalOpen}
                initialData={miembroToEdit || undefined}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Crear Miembro
                </Button>
            </Box>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar este miembro? Esta acción no se puede deshacer."
                onCancel={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </Box>
    );
};

export default MiembroScreen;
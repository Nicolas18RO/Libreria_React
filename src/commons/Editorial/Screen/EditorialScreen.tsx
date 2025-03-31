import { Box, Button, Typography} from "@mui/material";
import ListEditorialTable from "../components/Table_ListEditorial";
import EditorialModal from "../components/CreateEditorial";
import { Editorial } from "../types/types";
import useEditorial from "../hooks/useEditorial";
import { useState } from "react";
import { deleteEditorial } from "../services/services"; 
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const EditorialScreen: React.FC = () => {
    const { editoriales, loading, error, refresh } = useEditorial();
    const [modalOpen, setModalOpen] = useState(false);
    const [editorialToEdit, setEditorialToEdit] = useState<Editorial | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editorialToDelete, setEditorialToDelete] = useState<number | null>(null);

    const handleCreate = () => {
        setEditorialToEdit(null);
        setModalOpen(true);
    };

    const handleEdit = (editorial: Editorial) => {
        setEditorialToEdit(editorial);
        setModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setEditorialToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (editorialToDelete) {
            try {
                await deleteEditorial(editorialToDelete);
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
        setEditorialToEdit(null);
    };

    return (
        <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
            <Typography variant="h4" color="success" align="center" fontWeight='bold'>
                Editoriales
            </Typography>
            <ListEditorialTable 
                editoriales={editoriales} 
                loading={loading} 
                error={error} 
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />
            
            <EditorialModal
                open={modalOpen}
                initialData={editorialToEdit || undefined}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Crear Editorial
                </Button>
            </Box>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar esta editorial? Esta acción no se puede deshacer."
                onCancel={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </Box>
    );
};

export default EditorialScreen;
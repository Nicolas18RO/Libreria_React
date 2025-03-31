import { Box, Button, Typography} from "@mui/material";
import ListAutorsTable from "../components/Table_ListAutors";
import AutorModal from "../components/CreateAutor";
import { Autor } from "../types/types";
import useAutor from "../hooks/useAutor";
import { useState } from "react";
import { deleteAutor } from "../services/services"; // Assuming you have this service
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const AutorScreen: React.FC = () => {
    const { autores, loading, error, refresh } = useAutor();
    const [modalOpen, setModalOpen] = useState(false);
    const [autorToEdit, setAutorToEdit] = useState<Autor | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [autorToDelete, setAutorToDelete] = useState<number | null>(null);

    const handleCreate = () => {
        setAutorToEdit(null);
        setModalOpen(true);
    };

    const handleEdit = (autor: Autor) => {
        setAutorToEdit(autor);
        setModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setAutorToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (autorToDelete) {
            try {
                await deleteAutor(autorToDelete);
                refresh();
                setDeleteDialogOpen(false);
            } catch (err) {
                console.error("Error Deleting Autor:", err);
            }
        }
    };

    const handleSuccess = () => {
        refresh();
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setAutorToEdit(null);
    };

    return (
        <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
            <Typography variant="h4" color="success" align="center" fontWeight='bold'>
                Autores
            </Typography>
            <ListAutorsTable 
                autores={autores} 
                loading={loading} 
                error={error} 
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />
            
            <AutorModal
                open={modalOpen}
                initialData={autorToEdit || undefined}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Crear Autor
                </Button>
            </Box>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar este autor? Esta acción no se puede deshacer."
                onCancel={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </Box>
    );
};

export default AutorScreen;
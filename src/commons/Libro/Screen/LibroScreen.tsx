import { Box, Button, Typography} from "@mui/material";
import ListLibroTable from "../components/Table_ListLibro";
import LibroModal from "../components/CreateLibro";
import { Libro } from "../types/types";
import useLibro from "../hooks/useLibro";
import { useState } from "react";
import { deleteLibro } from "../services/services"; 
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const LibroScreen: React.FC = () => {
    const { libros, loading, error, refresh } = useLibro();
    const [modalOpen, setModalOpen] = useState(false);
    const [libroToEdit, setLibroToEdit] = useState<Libro | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [libroToDelete, setLibroToDelete] = useState<number | null>(null);

    const handleCreate = () => {
        setLibroToEdit(null);
        setModalOpen(true);
    };

    const handleEdit = (libro: Libro) => {
        setLibroToEdit(libro);
        setModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setLibroToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (libroToDelete) {
            try {
                await deleteLibro(libroToDelete);
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
        setLibroToEdit(null);
    };

    return (
        <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
            <Typography variant="h4" color="success" align="center" fontWeight='bold'>
                Libros
            </Typography>
            <ListLibroTable 
                libros={libros} 
                loading={loading} 
                error={error} 
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />
            
            <LibroModal
                open={modalOpen}
                initialData={libroToEdit || undefined}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Crear Libro
                </Button>
            </Box>

            <ConfirmationDialog
                open={deleteDialogOpen}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer."
                onCancel={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </Box>
    );
};

export default LibroScreen;
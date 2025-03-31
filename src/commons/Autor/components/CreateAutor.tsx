// src/commons/Personas/components/PersonaModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Autor } from '../types/types';
import { createAutor, updateAutor } from '../services/services';

interface AutorModalProps {
  open: boolean;
  initialData?: Autor;
  onClose: () => void;
  onSuccess: () => void;
}

const AutorModal: React.FC<AutorModalProps> = ({ open, initialData, onClose, onSuccess }) => {
  // Definimos el estado del formulario. Si hay initialData, estamos en modo edición.
  const [formData, setFormData] = useState({
    id_autor: undefined as number | undefined,
    nombre_Autor: '',
    apellido_Autor: '',
    biografia_Autor: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_autor: initialData.id_autor,
        nombre_Autor: initialData.nombre_Autor,
        apellido_Autor: initialData.apellido_Autor,
        biografia_Autor: initialData.biografia_Autor,
      });
    } else {
      // En modo creación, reiniciamos los valores.
      setFormData({
        id_autor: undefined,
        nombre_Autor: '',
        apellido_Autor: '',
        biografia_Autor: '',
      });
    }
  }, [initialData, open]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (initialData && formData.id_autor) {
        // Modo edición: llamamos al servicio de actualización.
        const updated = await updateAutor(formData.id_autor, formData);
        setSuccess(`Autor actualizado: ${updated.nombre_Autor} ${updated.apellido_Autor}`);
      } else {
        // Modo creación: llamamos al servicio de creación.
        const created = await createAutor(formData);
        setSuccess(`Autor creado: ${created.nombre_Autor} ${created.apellido_Autor}`);
      }
      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Error al procesar la petición.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Actualizar Autor' : 'Crear Autor'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            name="nombre_Autor"
            value={formData.nombre_Autor}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Apellido"
            name="apellido_Autor"
            value={formData.apellido_Autor}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Biografia"
            name="biografia_Autor"
            value={formData.biografia_Autor}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading
                ? initialData ? 'Actualizando...' : 'Creando...'
                : initialData ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AutorModal;
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
import { Editorial } from '../types/types';
import { createEditorial, updateEditorial } from '../services/services';

interface EditorialModalProps {
  open: boolean;
  initialData?: Editorial;
  onClose: () => void;
  onSuccess: () => void;
}

const EditorialModal: React.FC<EditorialModalProps> = ({ open, initialData, onClose, onSuccess }) => {
  // Definimos el estado del formulario. Si hay initialData, estamos en modo edición.
  const [formData, setFormData] = useState({
    id_Editorial: undefined as number | undefined,
    nombre_Editorial: '',
    direccion_Editorial: '',
    telefono_Editorial: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_Editorial: initialData.id_Editorial,
        nombre_Editorial: initialData.nombre_Editorial,
        direccion_Editorial: initialData.direccion_Editorial,
        telefono_Editorial: initialData.telefono_Editorial,
      });
    } else {
      // En modo creación, reiniciamos los valores.
      setFormData({
        id_Editorial: undefined,
        nombre_Editorial: '',
        direccion_Editorial: '',
        telefono_Editorial: '',
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
      if (initialData && formData.id_Editorial) {
        // Modo edición: llamamos al servicio de actualización.
        const updated = await updateEditorial(formData.id_Editorial, formData);
        setSuccess(`Editorial actualizada: ${updated.nombre_Editorial}`);
      } else {
        // Modo creación: llamamos al servicio de creación.
        const created = await createEditorial(formData);
        setSuccess(`Editorial creada: ${created.nombre_Editorial} ${created.direccion_Editorial}`);
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
      <DialogTitle>{initialData ? 'Actualizar Editorial' : 'Crear Editorial'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            name="nombre_Editorial"
            value={formData.nombre_Editorial}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Direccion"
            name="direccion_Editorial"
            value={formData.direccion_Editorial}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Telefono"
            name="telefono_Editorial"
            value={formData.telefono_Editorial}
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

export default EditorialModal;
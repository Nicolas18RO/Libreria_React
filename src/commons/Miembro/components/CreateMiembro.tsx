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
import { Miembro } from '../types/types';
import { createMiembro, updateMiembro } from '../services/services';

interface MiembroModalProps {
  open: boolean;
  initialData?: Miembro;
  onClose: () => void;
  onSuccess: () => void;
}

const MiembroModal: React.FC<MiembroModalProps> = ({ open, initialData, onClose, onSuccess }) => {
  // Definimos el estado del formulario. Si hay initialData, estamos en modo edición.
  const [formData, setFormData] = useState({
    Id_miembro: undefined as number | undefined,
    nombre_miembro: '',
    apellido_miembro: '',
    email_Mienbro: '',
    fechamembresia: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Id_miembro: initialData.Id_miembro,
        nombre_miembro: initialData.nombre_miembro,
        apellido_miembro: initialData.apellido_miembro,
        email_Mienbro: initialData.email_Mienbro,
        fechamembresia: initialData.fechamembresia,
      });
    } else {
      // En modo creación, reiniciamos los valores.
      setFormData({
        Id_miembro: undefined,
        nombre_miembro: '',
        apellido_miembro: '',
        email_Mienbro: '',
        fechamembresia: '',
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
      if (initialData && formData.Id_miembro) {
        // Modo edición: llamamos al servicio de actualización.
        const updated = await updateMiembro(formData.Id_miembro, formData);
        setSuccess(`Miembro actualizado: ${updated.nombre_miembro}`);
      } else {
        // Modo creación: llamamos al servicio de creación.
        const created = await createMiembro(formData);
        setSuccess(`Miembro creado: ${created.nombre_miembro}`);
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
            name="nombre_miembro"
            value={formData.nombre_miembro}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Apellido"
            name="apellido_miembro"
            value={formData.apellido_miembro}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email_Mienbro"
            value={formData.email_Mienbro}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Fecha Membresia (YYYY-MM-DAY)"
            name="fechamembresia"
            value={formData.fechamembresia}
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

export default MiembroModal;
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
import { Prestamo } from '../types/types';
import { createPrestamo, updatePrestamo } from '../services/services';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface PrestamoModalProps {
  open: boolean;
  initialData?: Prestamo;
  onClose: () => void;
  onSuccess: () => void;
}

const PrestamoModal: React.FC<PrestamoModalProps> = ({ open, initialData, onClose, onSuccess }) => {
  // Definimos el estado del formulario. Si hay initialData, estamos en modo edición.
  const [formData, setFormData] = useState({
    Id_prestamo: undefined as number | undefined,
    fecha_prestamo: '',
    fecha_devolucion: '',
    libro: 0,
    miembro: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Id_prestamo: initialData.Id_prestamo,
        fecha_prestamo: initialData.fecha_prestamo,
        fecha_devolucion: initialData.fecha_devolucion,
        libro: initialData.libro,
        miembro: initialData.miembro,
      });
      setFechaPrestamo(initialData.fecha_prestamo ? dayjs(initialData.fecha_prestamo) : null);
      setFechaDevolucion(initialData.fecha_devolucion ? dayjs(initialData.fecha_devolucion) : null);
    } else {
      setFormData({
        Id_prestamo: undefined,
        fecha_prestamo: '',
        fecha_devolucion: '',
        libro: 0,
        miembro: 0,
      });
      setFechaPrestamo(null);
      setFechaDevolucion(null);
    }
  }, [initialData, open]);
  
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fecha_prestamo, setFechaPrestamo] = useState<dayjs.Dayjs | null>(null);
  const [fecha_devolucion, setFechaDevolucion] = useState<dayjs.Dayjs | null>(null);

  
  const handleDateChange = (field: 'fecha_prestamo' | 'fecha_devolucion', newDate: dayjs.Dayjs | null) => {
    if (field === 'fecha_prestamo') {
      setFechaPrestamo(newDate);
      setFormData(prev => ({
        ...prev,
        fecha_prestamo: newDate ? newDate.format("YYYY-MM-DD") : ""
      }));
    } else if (field === 'fecha_devolucion') {
      setFechaDevolucion(newDate);
      setFormData(prev => ({
        ...prev,
        fecha_devolucion: newDate ? newDate.format("YYYY-MM-DD") : ""
      }));
    }
  };
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : isNaN(Number(value)) ? value : Number(value),
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Datos enviados al backend:", formData);
    try {
      if (initialData && formData.Id_prestamo) {
        // Modo edición: llamamos al servicio de actualización.
        const updated = await updatePrestamo(formData.Id_prestamo, formData);
        setSuccess(`Miembro actualizado: ${updated.Id_prestamo}`);
      } else {
        // Modo creación: llamamos al servicio de creación.
        const created = await createPrestamo(formData);
        setSuccess(`Miembro creado: ${created.Id_prestamo}`);
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
      <DialogTitle>{initialData ? 'Actualizar Prestamo' : 'Crear Prestamo'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Prestamo"
              value={fecha_prestamo}
              onChange={(date) => handleDateChange("fecha_prestamo", date)}
              slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}  
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Devolucion"
              value={fecha_devolucion}
              onChange={(date) => handleDateChange("fecha_devolucion", date)}
              slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }} 
            />
          </LocalizationProvider>

          <TextField
            label="Libro"
            name="libro"
            value={formData.libro}
            onChange={handleChange}
            type='number'
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Miembro"
            name="miembro"
            value={formData.miembro}
            onChange={handleChange}
            type='number'
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

export default PrestamoModal;
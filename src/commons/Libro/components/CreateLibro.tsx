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
import { Libro } from '../types/types';
import { createLibro, updateLibro } from '../services/services';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface LibroModalProps {
  open: boolean;
  initialData?: Libro;
  onClose: () => void;
  onSuccess: () => void;
}

const LibroModal: React.FC<LibroModalProps> = ({ open, initialData, onClose, onSuccess }) => {
  // Definimos el estado del formulario. Si hay initialData, estamos en modo edición.
  const [formData, setFormData] = useState({
    id_libro: undefined as number | undefined,
    titulo_libro: '',
    resumen_libro: '',
    ISBN_libro: '',
    aniopublicacion_libro: '',
    autor: 0,
    editorial: 0,

  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_libro: initialData.id_libro,
        titulo_libro: initialData.titulo_libro,
        resumen_libro: initialData.resumen_libro,
        ISBN_libro: initialData.ISBN_libro,
        aniopublicacion_libro: initialData.aniopublicacion_libro,
        autor: initialData.autor,
        editorial: initialData.editorial,

      });
    } else {
      // En modo creación, reiniciamos los valores.
      setFormData({
        id_libro: undefined,
        titulo_libro: '',
        resumen_libro: '',
        ISBN_libro: '',
        aniopublicacion_libro: '',
        autor: 0,
        editorial: 0,
      });
    }
  }, [initialData, open]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [aniopublicacion_libro, setFechaPublicacion] = React.useState(initialData?.aniopublicacion_libro ? dayjs(initialData.aniopublicacion_libro) : null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
      if (!newDate || !(newDate instanceof dayjs)) {
        setFechaPublicacion(null);
        setFormData((prev) => ({ ...prev, aniopublicacion_libro: "" })); 
        return;
      }
    
      const formattedDate = newDate.format("YYYY-MM-DD");
      console.log(
        "Fecha seleccionada:", formattedDate, 
        "| Tipo:", typeof formattedDate
      );
    
      setFechaPublicacion(newDate);
      setFormData((prev) => ({ ...prev, aniopublicacion_libro: formattedDate })); 
    };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Datos enviados al backend:", formData);

    try {
      if (initialData && formData.id_libro) {
        // Modo edición: llamamos al servicio de actualización.
        const updated = await updateLibro(formData.id_libro, formData);
        setSuccess(`Libro actualizado: ${updated.titulo_libro}`);
      } else {
        // Modo creación: llamamos al servicio de creación.
        const created = await createLibro(formData);
        setSuccess(`Libro creado: ${created.titulo_libro}`);
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
      <DialogTitle>{initialData ? 'Actualizar Libro' : 'Crear Libro'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Titulo"
            name="titulo_libro"
            value={formData.titulo_libro}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Resumen"
            name="resumen_libro"
            value={formData.resumen_libro}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="ISBN"
            name="ISBN_libro"
            value={formData.ISBN_libro}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Publicación"
              value={aniopublicacion_libro}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }} // Nueva forma de personalizar el TextField
            />
          </LocalizationProvider>

          <TextField
            label="Autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            type='number'
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Editorial"
            name="editorial"
            value={formData.editorial}
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

export default LibroModal;
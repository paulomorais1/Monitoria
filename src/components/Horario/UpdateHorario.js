import React, { useRef, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateHorario = ({ horarioDataForUpdate, onUpdate, onCancel }) => {
  const [horarioData, setHorarioData] = useState({
    DiaSemana: '',
    HorarioInicio: '',
    HorarioTermino: '',
    MonitorID: '',
    DisciplinaID: '',
    ...horarioDataForUpdate,
  });

  const ref = useRef();

  useEffect(() => {
    setHorarioData(horarioDataForUpdate);
  }, [horarioDataForUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para atualizar o horário
    try {
      // Substitua o código abaixo pela lógica de atualização real
      console.log('Atualizando horário:', horarioData);
      toast.success('Horário atualizado com sucesso!');
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Erro ao atualizar horário:', error.message);
      toast.error('Erro ao atualizar horário. Consulte a console para detalhes.');
    } finally {
      // Fechar o modal, independentemente do resultado da atualização
      if (onCancel) onCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHorarioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={true} onClose={onCancel} ref={ref}>
      <DialogTitle>Atualizar Horário</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Dia da Semana"
            name="DiaSemana"
            value={horarioData.DiaSemana}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Horário de Início"
            name="HorarioInicio"
            value={horarioData.HorarioInicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Horário de Término"
            name="HorarioTermino"
            value={horarioData.HorarioTermino}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID do Monitor"
            name="MonitorID"
            value={horarioData.MonitorID}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID da Disciplina"
            name="DisciplinaID"
            value={horarioData.DisciplinaID}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Atualizar
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateHorario;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button,  Typography } from '@mui/material';

const StyledButton = styled(Button)`
  && {
    margin: 0 auto;
    width: 60%;
    font-size: 16px;
  }
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 20px repeat(auto-fill, 1fr) 50px;
  align-items: flex-end;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
  width: 80%;
`;

const Label = styled.label``;


const AddHorario = () => {
  const [diaSemana, setDiaSemana] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioTermino, setHorarioTermino] = useState('');
  const [monitorID, setMonitorID] = useState('');
  const [disciplinaID, setDisciplinaID] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('http://localhost:8080/Horario/addHorario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaSemana,
          horarioInicio,
          horarioTermino,
          monitorID,
          disciplinaID,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      setDiaSemana('');
      setHorarioInicio('');
      setHorarioTermino('');
      setMonitorID('');
      setDisciplinaID('');

    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
      
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (

      <FormContainer  ref={ref} onSubmit={handleSubmit}>
        <Typography variant="h5">Adicionar Horário</Typography>
        <TextField
          label="Dia da Semana"
          variant="outlined"
          margin="normal"
          value={diaSemana}
          onChange={(e) => setDiaSemana(e.target.value)}
        />
        <Label>Horário de Início</Label>
        <TextField
       
          variant="outlined"
          margin="normal"
          type='time'
          value={horarioInicio}
          onChange={(e) => setHorarioInicio(e.target.value)}
        />
        <Label>Horário de Término</Label>

        <TextField
          type='time'
          variant="outlined"
          margin="normal"
          value={horarioTermino}
          onChange={(e) => setHorarioTermino(e.target.value)}
        />
        <TextField
          label="ID do Monitor"
          type='number'
          variant="outlined"
          margin="normal"
          value={monitorID}
          onChange={(e) => setMonitorID(e.target.value)}
        />
        <TextField
          label="ID da Disciplina"
          type='number'
          variant="outlined"
          margin="normal"
          value={disciplinaID}
          onChange={(e) => setDisciplinaID(e.target.value)}
        />
        <StyledButton variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? 'Aguarde...' : 'Adicionar Horário'}
        </StyledButton>
      
      </FormContainer>

  );
};

export default AddHorario;

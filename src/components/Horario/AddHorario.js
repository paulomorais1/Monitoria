import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Paper } from '@mui/material';

const AddHorarioContainer = styled(Paper)`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddHorario = () => {
  const [diaSemana, setDiaSemana] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioTermino, setHorarioTermino] = useState('');
  const [monitorID, setMonitorID] = useState('');
  const [disciplinaID, setDisciplinaID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar os dados para o servidor (você pode usar fetch ou axios, por exemplo)
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

      // Verificar se a resposta não está vazia antes de tentar analisar como JSON
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`);
      }

      const data = await response.json();

      // Exibir feedback ao usuário, como uma mensagem de sucesso ou erro
      console.log(data);

      // Limpar os campos do formulário após o sucesso
      setDiaSemana('');
      setHorarioInicio('');
      setHorarioTermino('');
      setMonitorID('');
      setDisciplinaID('');
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    }
  };

  return (
    <AddHorarioContainer>
      <h2>Adicionar Horário</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Dia da Semana"
          variant="outlined"
          margin="normal"
          value={diaSemana}
          onChange={(e) => setDiaSemana(e.target.value)}
        />
        <TextField
          label="Horário de Início"
          variant="outlined"
          margin="normal"
          value={horarioInicio}
          onChange={(e) => setHorarioInicio(e.target.value)}
        />
        <TextField
          label="Horário de Término"
          variant="outlined"
          margin="normal"
          value={horarioTermino}
          onChange={(e) => setHorarioTermino(e.target.value)}
        />
        <TextField
          label="ID do Monitor"
          variant="outlined"
          margin="normal"
          value={monitorID}
          onChange={(e) => setMonitorID(e.target.value)}
        />
        <TextField
          label="ID da Disciplina"
          variant="outlined"
          margin="normal"
          value={disciplinaID}
          onChange={(e) => setDisciplinaID(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Adicionar Horário
        </Button>
      </form>
    </AddHorarioContainer>
  );
};

export default AddHorario;

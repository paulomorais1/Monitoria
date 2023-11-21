import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Paper,
  Button,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import UpdateHorario from './UpdateHorario'; // Importe o componente de atualização
import DeleteHorario from './DeleteHorario'; // Importe o componente de exclusão

const HorarioListContainer = styled(Paper)`
  margin: 20px auto;
  padding: 20px;

  h2 {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    button {
      margin-right: 5px;
    }
  }
`;

const HorarioList = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleEditClick = (id) => {
    // Abre o formulário de atualização quando o botão Editar é clicado
    const selected = horarios.find((horario) => horario.ID === id);
    setSelectedHorario(selected);
    setShowUpdateForm(true);
  };

  const handleDeleteClick = (id) => {
    // Lógica para excluir o item com o ID fornecido
    console.log(`Excluir o item com ID ${id}`);
  };

  const closeModal = () => {
    setShowUpdateForm(false);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessToast(false);
    setShowErrorToast(false);
  };

  useEffect(() => {
    // Carregar horários do servidor ao montar o componente
    const fetchHorarios = async () => {
      try {
        const response = await fetch('http://localhost:8080/Horario/getHorarios.php');
        const responseData = await response.json();

        if (Array.isArray(responseData.horarios)) {
          setHorarios(responseData.horarios);
        } else {
          console.error('A resposta do servidor não contém um array de horários:', responseData);
        }
      } catch (error) {
        console.error('Erro ao buscar horários:', error);
        setShowErrorToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []); // Dependência vazia para executar apenas uma vez ao montar

  return (
    <HorarioListContainer>
      <h2>Lista de Horários</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Dia da Semana</th>
                <th>Horário de Início</th>
                <th>Horário de Término</th>
                <th>ID do Monitor</th>
                <th>ID da Disciplina</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario) => (
                <tr key={horario.ID}>
                  <td>{horario.DiaSemana}</td>
                  <td>{horario.HorarioInicio}</td>
                  <td>{horario.HorarioTermino}</td>
                  <td>{horario.MonitorID}</td>
                  <td>{horario.DisciplinaID}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(horario.ID)}
                    >
                      Editar
                    </Button>
                    <DeleteHorario
                      onDelete={() => handleDeleteClick(horario.ID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Renderiza o formulário de atualização quando showUpdateForm é true */}
          {showUpdateForm && (
            <UpdateHorario
              horarioDataForUpdate={selectedHorario}
              onUpdate={() => {
                setShowSuccessToast(true);
                setShowUpdateForm(false);
              }}
              onCancel={closeModal}
            />
          )}
        </div>
      )}
      {/* Toasts */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={1000}
        onClose={handleToastClose}
      >
        <MuiAlert
          onClose={handleToastClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Operação realizada com sucesso!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={showErrorToast}
        autoHideDuration={1000}
        onClose={handleToastClose}
      >
        <MuiAlert
          onClose={handleToastClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          Ops! Algo deu errado. Verifique a console para detalhes.
        </MuiAlert>
      </Snackbar>
    </HorarioListContainer>
  );
};

export default HorarioList;

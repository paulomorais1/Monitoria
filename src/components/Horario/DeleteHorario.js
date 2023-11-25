/* eslint-disable no-undef */
import React from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const DeleteHorario = ({ setError, onDelete, setLoading, horarioData }) => {
  const handleDeleteClick = async () => {
    if (!setLoading) {
      console.error("setLoading is not defined");
      return;
    }

    if (!horarioData || typeof horarioData !== 'object' || !('ID' in horarioData)) {
      console.error("Invalid or missing horarioData");
      return;
    }

    setLoading(true);

    if (setError) {
      setError(null);
    }

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ID: horarioData.ID }),
    };

    try {
      const response = await fetch(
        'http://localhost:8080/Horario/deleteHorario.php',
        requestOptions
      );

      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());

      if (response.ok) {
        toast.success('Horário excluído com sucesso!');
        if (onDelete) {
          onDelete();
        }
      } else {
        console.error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );

        if (setError) {
          setError(
            'Erro durante a exclusão do horário. Consulte a console para detalhes.'
          );
        }
        toast.error(
          'Erro ao excluir horário. Consulte a console para detalhes.'
        );
      }
    } catch (error) {
      console.error('Erro durante a exclusão do horário:', error.message);

      if (setError) {
        setError(
          'Erro durante a exclusão do horário. Consulte a console para detalhes.'
        );
      }
      toast.error('Erro ao excluir horário. Consulte a console para detalhes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton aria-label='delete' onClick={handleDeleteClick}>
      <DeleteIcon color='secondary' />
    </IconButton>
  );
};

export default DeleteHorario;

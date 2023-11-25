/* eslint-disable no-undef */
import React from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// ...

const DeleteMonitor = ({ setError, toast, onDelete, setLoading, monitorData }) => {
  const handleDeleteClick = async () => {
    if (!setLoading) {
      console.error("setLoading is not defined");
      return;
    }
  
    setLoading(true);
  
    // Verifica se setError está definido antes de utilizá-lo
    if (setError) {
      setError(null);
    }
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ID: monitorData.ID }),
    };
  
    try {
      const response = await fetch(
        'http://localhost:8080/Monitores/deleteMonitor.php',
        requestOptions
      );
  
      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());
  
      if (response.ok) {
        toast.success('Monitor excluído com sucesso!');
        // Verifica se onDelete está definido antes de utilizá-lo
        if (onDelete) {
          onDelete(); // Chama a função onDelete do componente pai
        }
      } else {
        console.error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
        // Verifica se setError está definido antes de utilizá-lo
        if (setError) {
          setError(
            'Erro durante a exclusão do monitor. Consulte a console para detalhes.'
          );
        }
        toast.error(
          'Erro ao excluir monitor. Consulte a console para detalhes.'
        );
      }
    } catch (error) {
      console.error('Erro durante a exclusão do monitor:', error.message);
      // Verifica se setError está definido antes de utilizá-lo
      if (setError) {
        setError(
          'Erro durante a exclusão do monitor. Consulte a console para detalhes.'
        );
      }
      toast.error('Erro ao excluir monitor. Consulte a console para detalhes.');
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

export default DeleteMonitor;

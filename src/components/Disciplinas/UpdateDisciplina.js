import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-end;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
  width: 20vw;
  gap: 10px 0;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px;
  width: 70%;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  height: 40px;
`;



const StyledButton = styled(Button)`
  && {
    /* Adicione estilos personalizados aqui */
    margin: 0 auto;
    width: 60%;
    font-size: 16px; /* Exemplo de ajuste de tamanho de fonte */
  }
`;

const Label = styled.label``;

const UpdateDisciplina = ({ disciplinaDataForUpdate, onUpdate, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disciplinaData, setDisciplinaData] = useState({
    ID: '',
    Nome: '',
    Descricao: '',
    Tipo: '',
    ...disciplinaDataForUpdate,
  });

  const ref = useRef();

  useEffect(() => {
    setDisciplinaData(disciplinaDataForUpdate);
  }, [disciplinaDataForUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const dataToUpdate = {
      id: disciplinaData.id,
      ...disciplinaDataForUpdate,
      ...disciplinaData,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    };

    try {
      const response = await fetch(
        'http://localhost:8080/Disciplinas/updateDisciplina.php',
        requestOptions
      );

      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());

      if (response.ok) {
        toast.success('Disciplina atualizada com sucesso!');
        if (onUpdate) onUpdate();
      } else {
        console.error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
        setError(
          'Erro durante a atualização da disciplina. Consulte a console para detalhes.'
        );
        toast.error(
          'Erro ao atualizar disciplina. Consulte a console para detalhes.'
        );
      }
    } catch (error) {
      console.error(
        'Erro durante a atualização da disciplina:',
        error.message
      );
      setError(
        'Erro durante a atualização da disciplina. Consulte a console para detalhes.'
      );
      toast.error(
        'Erro ao atualizar disciplina. Consulte a console para detalhes.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplinaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>ID</Label>
        <Input name="ID" value={disciplinaData.ID} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input name="Nome" value={disciplinaData.Nome} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <Label>Professor(a°)</Label>
        <Input name="Professor" value={disciplinaData.Professor} onChange={handleChange} />
      </InputArea>
     
   

      <StyledButton
        variant="contained"
        color="success"
        size="small"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Aguarde...' : 'Atualizar Disciplina'}
      </StyledButton>

      <StyledButton
        variant="contained"
        color="error"
        size="small"
        onClick={onCancel}
      >
        Cancelar
      </StyledButton>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ToastContainer />
    </FormContainer>
  );
};

export default UpdateDisciplina;

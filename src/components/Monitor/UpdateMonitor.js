import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr ;
  align-items: flex-end;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  padding: 10px;
  width: 20vw;
  gap:10px 0;
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

const Select = styled.select`
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  height: 40px;
`;
const StyledButton = styled(Button)`
  && {
    /* Adicione estilos personalizados aqui */
    margin:0 auto;
    width:60%;
    font-size: 16px; /* Exemplo de ajuste de tamanho de fonte */

  }
`;




const Label = styled.label``;
// ... (importações e estilos)

const UpdateMonitor = ({ monitorDataForUpdate, onUpdate, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [monitorData, setMonitorData] = useState({
      ID: '',
      Nome: '',
      Email: '',
      Ra: '',
      Tipo: '',
      ...monitorDataForUpdate,
    });
  
    const ref = useRef();
  
    useEffect(() => {
      setMonitorData(monitorDataForUpdate);
    }, [monitorDataForUpdate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true);
      setError(null);
  
      const dataToUpdate = {
        id: monitorData.id,
        ...monitorDataForUpdate,
        ...monitorData,
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
          'http://localhost:8080/Monitores/updateMonitor.php',
          requestOptions
        );
  
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
  
        if (response.ok) {
          toast.success('Monitor atualizado com sucesso!');
          if (onUpdate) onUpdate();
        } else {
          console.error(
            `Erro na requisição: ${response.status} ${response.statusText}`
          );
          setError(
            'Erro durante a atualização do monitor. Consulte a console para detalhes.'
          );
          toast.error(
            'Erro ao atualizar monitor. Consulte a console para detalhes.'
          );
        }
      } catch (error) {
        console.error('Erro durante a atualização do monitor:', error.message);
        setError(
          'Erro durante a atualização do monitor. Consulte a console para detalhes.'
        );
        toast.error(
          'Erro ao atualizar monitor. Consulte a console para detalhes.'
        );
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMonitorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    return (
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <InputArea>
          <Label>ID</Label>
          <Input name="ID" value={monitorData.ID} onChange={handleChange} />
        </InputArea>
        <InputArea>
          <Label>Nome</Label>
          <Input name="Nome" value={monitorData.Nome} onChange={handleChange} />
        </InputArea>
        <InputArea>
          <Label>Email</Label>
          <Input
            name="Email"
            type="email"
            value={monitorData.Email}
            onChange={handleChange}
          />
        </InputArea>
        <InputArea>
          <Label>Ra</Label>
          <Input name="Ra" value={monitorData.Ra} onChange={handleChange} />
        </InputArea>
        <InputArea>
          <Label>Tipo</Label>
          <Select name="Tipo" value={monitorData.Tipo} onChange={handleChange}>
            <option value="MD">MD</option>
            <option value="MIDIT">MIDIT</option>
            {/* Adicione outras opções conforme necessário */}
          </Select>
        </InputArea>
  
        <StyledButton variant="contained" color="success" size="small" type="submit" disabled={loading}>
          {loading ? 'Aguarde...' : 'Atualizar Monitor'}
        </StyledButton>
  
        <StyledButton variant="contained" color="error" size="small" onClick={onCancel}>
          Cancelar
        </StyledButton>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        <ToastContainer />
      </FormContainer>
    );
  };
  
  export default UpdateMonitor;
  
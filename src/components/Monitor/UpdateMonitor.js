import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 80%;
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

const Label = styled.label``;

const UpdateMonitor = ({ monitorId, onUpdate, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [monitorData, setMonitorData] = useState({
    Nome: "",
    Email: "",
    Ra: "",
    Tipo: "",
  });

  const ref = useRef();

  useEffect(() => {
    // Aqui você pode carregar os dados do monitor com o ID fornecido (monitorId)
    // e preencher o estado monitorData
    // Exemplo fictício:
    // fetch(`http://localhost:8080/Monitores/getMonitor.php?id=${monitorId}`)
    //   .then(response => response.json())
    //   .then(data => setMonitorData(data))
    //   .catch(error => console.error("Erro ao carregar dados do monitor", error));
  }, [monitorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica de atualização aqui

    setLoading(true);
    setError(null);

    const dataToUpdate = {
      id: monitorId, // Você precisa enviar o ID do monitor a ser atualizado
      ...monitorData,
    };

    const requestOptions = {
      method: "PUT", // Use o método HTTP adequado para atualização (PUT, PATCH, etc.)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/Monitores/updateMonitor.php",
        requestOptions
      );

      if (response.ok) {
        // Lógica de sucesso aqui
        toast.success("Monitor atualizado com sucesso!");
        if (onUpdate) onUpdate(); // Chama a função de atualização na lista de monitores
      } else {
        console.error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
        setError(
          "Erro durante a atualização do monitor. Consulte a console para detalhes."
        );
        toast.error(
          "Erro ao atualizar monitor. Consulte a console para detalhes."
        );
      }
    } catch (error) {
      console.error("Erro durante a atualização do monitor:", error.message);
      setError(
        "Erro durante a atualização do monitor. Consulte a console para detalhes."
      );
      toast.error(
        "Erro ao atualizar monitor. Consulte a console para detalhes."
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
        <Label>Nome</Label>
        <Input
          name="Nome"
          value={monitorData.Nome}
          onChange={handleChange}
        />
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
        <Input
          name="Ra"
          value={monitorData.Ra}
          onChange={handleChange}
        />
      </InputArea>
      <InputArea>
        <Label>Tipo</Label>
        <Select
          name="Tipo"
          value={monitorData.Tipo}
          onChange={handleChange}
        >
          {/* Options do Tipo */}
        </Select>
      </InputArea>

      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? "Aguarde..." : "Atualizar Monitor"}
      </Button>

      <Button variant="contained" onClick={onCancel}>
        Cancelar
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ToastContainer />
    </FormContainer>
  );
};

export default UpdateMonitor;

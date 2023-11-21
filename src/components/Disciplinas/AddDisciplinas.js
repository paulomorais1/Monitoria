/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
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
  width: 90%;
`;

const Select = styled.select`
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  height: 40px;
  width: 90%;
`;

const Label = styled.label``;

const AddDisciplinas = ({ getDisciplinas, onAdd }) => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const disciplinas = ref.current;

    if (!disciplinas) {
      console.error("Referência para disciplinas é nula ou indefinida.");
      return;
    }

    if (!disciplinas.Nome.value || !disciplinas.Professor.value) {
      console.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setError(null);

    const dataToSend = {
      Nome: disciplinas.Nome.value,
      Professor: disciplinas.Professor.value,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/Disciplinas/addDisciplinas.php",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Dados do servidor:", data);

        disciplinas.Nome.value = "";
        disciplinas.Professor.value = "";

        if (getDisciplinas && typeof getDisciplinas === "function") {
          getDisciplinas();
        }

        if (onAdd && typeof onAdd === "function") {
          onAdd(); // Notifica o componente pai sobre a adição bem-sucedida
        }

        // Exibir Toast de sucesso
        toast.success("Disciplina adicionada com sucesso!");

        // Recarrega a página após o sucesso na adição
      } else {
        console.error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
        setError(
          "Erro durante a adição da disciplina. Consulte a console para detalhes."
        );
        // Exibir Toast de erro
        toast.error("Erro ao adicionar disciplina. Consulte a console para detalhes.");
      }
    } catch (error) {
      console.error("Erro durante a adição da disciplina:", error.message);
      setError(
        "Erro durante a adição da disciplina. Consulte a console para detalhes."
      );
      // Exibir Toast de erro
      toast.error("Erro ao adicionar disciplina. Consulte a console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="Nome" />
      </InputArea>
      <InputArea>
        <Label>Professor</Label>
        <Input name="Professor" />
      </InputArea>

      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? "Aguarde..." : "Adicionar Nova Disciplina"}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Componente de ToastContainer para exibir mensagens de sucesso/erro */}
      <ToastContainer />
    </FormContainer>
  );
};

export default AddDisciplinas;

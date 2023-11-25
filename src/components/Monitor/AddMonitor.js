/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

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

const Select = styled.select`
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  height: 40px;
  width: 90%;
`;
const StyledStack = styled(Stack)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Label = styled.label``;

const AddMonitor = ({ getUsers, onAdd }) => {
  const ref = useRef();
  const [tipoOptions, setTipoOptions] = useState(["", "MD", "MDIT"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Faça algo com o arquivo, se necessário
    console.log("Arquivo selecionado:", file);
  };

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setShowImageInput(selectedTipo === 'MD');
  };

  const isMdSelected = () => {
    const monitors = ref.current;
    return monitors && monitors.Tipo && monitors.Tipo.value === "MD";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const monitors = ref.current;

    if (!monitors) {
      console.error("Referência para monitors é nula ou indefinida.");
      return;
    }

    if (
      !monitors.Nome.value ||
      !monitors.Email.value ||
      !monitors.Ra.value ||
      !monitors.Tipo.value
    ) {
      console.error("Preencha todos os campos!");
      return;
    }

    // Verifica se a opção é "MD" e o campo de imagem está visível
    if (isMdSelected() && showImageInput) {
      const imagemPerfil = monitors.imagemPerfil.value;
      const urlFotoPerfil = monitors.UrlFotoPerfil.value;

      if (!imagemPerfil && !urlFotoPerfil) {
        console.error("Preencha a URL da imagem de perfil ou envie uma imagem.");
        return;
      }
    }

    setLoading(true);
    setError(null);

    const dataToSend = {
      Nome: monitors.Nome.value,
      Email: monitors.Email.value,
      Ra: monitors.Ra.value,
      Tipo: monitors.Tipo.value,
      // Adicione os campos necessários para a URL ou imagem de perfil, conforme a lógica do seu backend
      ImagemPerfil: monitors.imagemPerfil ? monitors.imagemPerfil.value : "",
      UrlFotoPerfil: monitors.UrlFotoPerfil ? monitors.UrlFotoPerfil.value : "",
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
        "http://localhost:8080/Monitores/addMonitor.php",
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Dados do servidor:", data);

        monitors.Nome.value = "";
        monitors.Email.value = "";
        monitors.Ra.value = "";
        monitors.Tipo.value = "";

        if (getUsers && typeof getUsers === "function") {
          getUsers();
        }

        if (onAdd && typeof onAdd === "function") {
          onAdd(); // Notifica o componente pai sobre a adição bem-sucedida
        }

        // Exibir Toast de sucesso
        toast.success("Monitor adicionado com sucesso!");

        // Recarrega a página após o sucesso na adição
      } else {
        console.error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
        setError(
          "Erro durante a adição do monitor. Consulte a console para detalhes."
        );
        // Exibir Toast de erro
        toast.error(
          "Erro ao adicionar monitor. Consulte a console para detalhes."
        );
      }
    } catch (error) {
      console.error("Erro durante a adição do monitor:", error.message);
      setError(
        "Erro durante a adição do monitor. Consulte a console para detalhes."
      );
      // Exibir Toast de erro
      toast.error(
        "Erro ao adicionar monitor. Consulte a console para detalhes."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <h2>Adicionar Monitor</h2>
      <InputArea>
        <TextField
          name="Nome"
          label="Nome"
          variant="outlined"
          margin="normal"
          required
        />
      </InputArea>
      <InputArea>
        <TextField
          label="Email:"
          name="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
        />
      </InputArea>
      <InputArea>
        <TextField
          label="Ra:"
          name="Ra"
          type="number"
          variant="outlined"
          margin="normal"
          required
        />
      </InputArea>
      <InputArea>
        <Label>Tipo</Label>
        <Select name="Tipo" onChange={handleTipoChange}>
          {tipoOptions.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </Select>
      </InputArea>

      {showImageInput && (
        <StyledStack>
          <Grid container spacing={2} alignItems="center" justifyContent="center" padding="10px">
            <Grid item>
              <TextField
                label="Url foto de Perfil"
                name="UrlFotoPerfil"
                type="url"
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item>
              <input
                type="file"
                name="imagemPerfil"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <label htmlFor="imagemPerfil">
                <Button
                  component="span"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Enviar Foto
                </Button>
              </label>
            </Grid>
          </Grid>
        </StyledStack>
      )}

      <StyledStack direction="row" spacing={1}>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Aguarde..." : "Adicionar Novo Monitor"}
        </Button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </StyledStack>

      {/* Componente de ToastContainer para exibir mensagens de sucesso/erro */}
      <ToastContainer />
    </FormContainer>
  );
};

export default AddMonitor;

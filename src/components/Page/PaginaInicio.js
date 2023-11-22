import React, { useState, useEffect } from "react";
import { Typography, CardContent, CardMedia ,Card as MuiCard } from "@mui/material";
import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; /* Coluna automática para a imagem e uma coluna para o conteúdo */
  gap: 20px; /* Espaçamento entre as colunas */
  padding: 10px;
  max-width: 900px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Centraliza o card na tela */
  display: flex;
  align-items: center; /* Centraliza o conteúdo verticalmente */  
`;

const StyledCardContent = styled(CardContent)`
  text-align: flex-start;
`;

const CustomCard = styled(MuiCard)`
`;

const StyledCardMedia = styled(CardMedia)`
  /* Add your styles for CardMedia here */
  /* For example, you can set a max-width or add a box-shadow */
  max-width: 20%;
 
`;
const StyledTitulo = styled.h1`
  text-align: center;
  /* Add any additional styles you want for the h1 element */
`;
const MonitorCard = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMonitorData = async () => {
      try {
        const response = await fetch("http://localhost:8080/Page/getPage.php");
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Conteúdo da resposta não é JSON.");
        }

        const data = await response.json();
        console.log("Data received:", data);

        if (data.monitores && data.horarios) {
          const combined = data.monitores.map((monitor, index) => {
            return {
              monitor,
              horario: data.horarios[index],
            };
          });

          setCombinedData(combined);
        } else {
          throw new Error("Dados de monitores ou horários não encontrados na resposta.");
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error.message);
        setError(
          "Erro ao obter dados. Verifique a console para detalhes."
        );
      } finally {
        setLoading(false);
      }
    };

    // Call the function when the component mounts (empty dependency array)
    getMonitorData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <CustomCard>
   <StyledTitulo>
      Acessos às Salas de Monitoria 1º Semestre de 2022
    </StyledTitulo>
      {combinedData.map(({ monitor, horario }, index) => (
        <StyledCard key={index}>
          <StyledCardMedia
            component="img"
            alt={monitor.nome}
            height="140"
            image={monitor.imagemPerfil}
          />
          <StyledCardContent>
            <h2>{monitor.nome}</h2>
            <Typography>RA: {monitor.ra}</Typography>
            <Typography>Email: <a href="email"> {monitor.email}</a></Typography>
            <Typography>Disciplina: <strong> {horario.nomeDisciplina} </strong></Typography>
            <Typography>Horário: {horario.DiaSemana}: {horario.HorarioInicio} às {horario.HorarioTermino}</Typography>
          </StyledCardContent>
        </StyledCard>
      ))}
    </CustomCard>
  );
};

export default MonitorCard;

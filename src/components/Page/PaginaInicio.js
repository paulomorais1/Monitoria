import React, { useState, useEffect } from "react";
import { Typography, CardContent, CardMedia, Card as MuiCard } from "@mui/material";

const MonitorCard = () => {
  const [monitorData, setMonitorData] = useState({});
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

        console.log("Dados do servidor:", data);

        if (data.monitores) {
          setMonitorData(data.monitores);
        } else {
          throw new Error("Dados de monitores não encontrados na resposta.");
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error.message);
        setError("Erro ao obter dados. Verifique a console para detalhes.");
      } finally {
        setLoading(false);
      }
    };

    getMonitorData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const organizeHorarios = (horarios) => {
    const disciplinas = {};
    horarios.forEach((horario) => {
      const { DisciplinaID, nomeDisciplina, DiaSemana, HorarioInicio, HorarioTermino } = horario;
      if (!disciplinas[DisciplinaID]) {
        disciplinas[DisciplinaID] = {
          nomeDisciplina,
          horarios: [],
        };
      }
      disciplinas[DisciplinaID].horarios.push({ DiaSemana, HorarioInicio, HorarioTermino });
    });

    return Object.values(disciplinas).map((disciplina) => ({
      ...disciplina,
      horarios: disciplina.horarios.sort((a, b) => {
        const dayComparison = diasSemana.indexOf(a.DiaSemana) - diasSemana.indexOf(b.DiaSemana);
        if (dayComparison !== 0) return dayComparison;
        return a.HorarioInicio.localeCompare(b.HorarioInicio);
      }),
    }));
  };

  const diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  const formatarHorarios = (horarios) => {
    return horarios.map((horario, index) => {
      return `${horario.DiaSemana}: ${horario.HorarioInicio} às ${horario.HorarioTermino}`;
    }).join(', ');
  };

  return (
    <MuiCard sx={{ display: 'grid', gridGap: 5, gridTemplateColumns: 'repeat(auto-fit, minmax(1fr))', gap: 10, padding: 10, maxWidth: 1100, margin: '0 auto', alignItems: 'center' }}>
      <Typography variant="h5" fontSize={24} fontWeight="bold">
        Acessos às Salas de Monitoria 1º Semestre de 2022
      </Typography>
      {Object.values(monitorData).map((monitor) => (
        <MuiCard key={monitor.id} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <CardMedia
            component="img"
            alt={monitor}
            sx={{ width: { xs: '100%', sm: '25%' }, height: { xs: '140px', sm: 'max-content' } }}
            image={monitor.imagemPerfil}
          />
          <CardContent sx={{ width: '70%' }}>
            <Typography variant="h6" fontSize={20} fontWeight="bold">
              {monitor.nome}
            </Typography>
            <Typography fontSize={16}>RA: {monitor.ra}</Typography>
            <Typography fontSize={16}>Email: <a href={`mailto:${monitor.email}`}>{monitor.email}</a></Typography>
            {monitor.horarios && organizeHorarios(monitor.horarios).map((disciplina, index) => (
              <div key={index}>
                <Typography variant="subtitle1" fontSize={18}>Disciplina: <strong>{disciplina.nomeDisciplina}</strong></Typography>
                <Typography variant="body2" fontSize={18}>Horários: {formatarHorarios(disciplina.horarios)}</Typography>
              </div>
            ))}
          </CardContent>
        </MuiCard>
      ))}
    </MuiCard>
  );
};

export default MonitorCard;

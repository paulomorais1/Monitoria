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
          
      <div sx={{padding:'2'}}>

      <Typography variant="h5" fontSize={36} fontWeight="bold" justifyContent={"center"} textAlign={"center"} word-break="break-all">
        Acessos às Salas de Monitoria 
      </Typography>
      <Typography variant="h5" fontSize={36} fontWeight="bold" justifyContent={"center"} textAlign={"center"} word-break="break-all">
      1º Semestre de 2022
      </Typography>
      </div>
  
      {Object.values(monitorData).map((monitor) => (
        <MuiCard key={monitor.id} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: "center", alignItems:'center'}}>
          <CardMedia
            component="img"
            alt={monitor}
            sx={{ width: { xs: '40%', md: '35%' , sm:'25%' }, height: { xs: '140px', md:'max-content', sm: 'max-content' } }}
            image={'https://png.pngtree.com/png-vector/20220608/ourlarge/pngtree-user-profile-character-faceless-unknown-png-image_4816132.png'}
          />
          <CardContent sx={{ width: '70%', }}>
            <Typography variant="h6" fontSize={20} fontWeight="bold" textTransform='uppercase' lineHeight='40px' >
              {monitor.nome}
            </Typography>
            <Typography fontSize={16} lineHeight='40px' textTransform='uppercase'>RA: {monitor.ra}</Typography>
            <Typography fontSize={16} lineHeight='40px' >EMAIL: <a href={`mailto:${monitor.email}`}>{monitor.email}</a></Typography>
            {monitor.horarios && organizeHorarios(monitor.horarios).map((disciplina, index) => (
              <div key={index}>
                <Typography variant="subtitle1" fontSize={22}  lineHeight='40px' textTransform='uppercase'>Disciplina: <strong>{disciplina.nomeDisciplina}</strong></Typography>
                <Typography variant="body2" fontSize={18}  lineHeight='40px'>HORÁRIOS: {formatarHorarios(disciplina.horarios)}</Typography>
              </div>
            ))}
          </CardContent>
        </MuiCard>
      ))}
    </MuiCard>
  );
};

export default MonitorCard;

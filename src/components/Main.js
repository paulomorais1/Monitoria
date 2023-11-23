/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import MonitorList from "./Monitor/MonitorList";
import HorarioList from "./Horario/HorarioList";
import DisciplinasList from "./Disciplinas/DisciplinasList";
import MonitorRestricted from "./Monitor/MonitorRestricted";
import DisciplinasRestricted from "./Disciplinas/DisciplinasRestricted";
import HorarioRestricted from "./Horario/HorarioRestricted";
import "./main.css";

const Lista = () => {
  const [selectedHorarioType, setSelectedHorarioType] = useState(null);
  const [selectedMonitorType, setSelectedMonitorType] = useState(null);
  const [selectedDisciplinaType, setSelectedDisciplinaType] = useState(null);
  const [openAddMonitor, setOpenAddMonitor] = useState(false);
  const [openAddDisciplinas, setOpenAddDisciplinas] = useState(false);
  const [openAddHorario, setOpenAddHorario] = useState(false);

  const [openListType, setOpenListType] = useState(undefined);

  const handleHorarioTypeClick = (horarioType) => {
    setSelectedHorarioType(horarioType);
    setOpenListType('HorarioList');
  };

  const handleMonitorTypeClick = (monitorType) => {
    setSelectedMonitorType(monitorType);
    setOpenListType('MonitorList');
  };

  const handleDisciplinaTypeClick = (disciplinaType) => {
    setSelectedDisciplinaType(disciplinaType);
    setOpenListType('DisciplinasList');
  };

  const handleOpenAddMonitor = () => {
    setOpenAddMonitor(true);
    setOpenListType(null); // Feche qualquer lista aberta ao adicionar um monitor
  };
  
  const handleCloseAddMonitor = () => {
    setOpenAddMonitor(false);
    setOpenListType(null); // Feche a lista ao fechar o conteúdo
  };

  const handleOpenAddDisciplinas = () => {
    setOpenAddDisciplinas(true);
    setOpenListType(null); // Close any open list when adding disciplinas
  };

  const handleCloseAddDisciplinas = () => {
    setOpenAddDisciplinas(false);
    setOpenListType(null); // Close any open list when adding disciplinas

  };

  const handleOpenAddHorario = () => {
    setOpenAddHorario(true);
    setOpenListType(null); // Close any open list when adding horario
  };

  const handleCloseAddHorario = () => {
    setOpenAddHorario(false);
    setOpenListType(null); // Close any open list when adding disciplinas

  };

  const handleCloseModal = () => {
    setOpenListType(null);
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h5">Gerir Monitores</Typography>
        <div className="actions">
          <Button variant="contained" onClick={handleOpenAddMonitor}>
            Adicionar Monitor
          </Button>
          <Button variant="contained" onClick={() => handleMonitorTypeClick("MD")}>
            Monitores MD
          </Button>
          <Button variant="contained" onClick={() => handleMonitorTypeClick("MIDIT")}>
            Monitores MIDIT
          </Button>
        </div>
      </div>
      <div className="header">
        <Typography variant="h5">Gerir Disciplinas</Typography>
        <div className="actions">
          <Button variant="contained" onClick={() => handleOpenAddDisciplinas()}>
            Adicionar  disciplina
          </Button>
          <Button variant="contained" onClick={() => handleDisciplinaTypeClick()}>
            Disciplinas
          </Button>
        </div>
      </div>
      <div className="header">
        <Typography variant="h5">Gerir Horarios</Typography>
        <div className="actions">
          <Button variant="contained" onClick={() => handleOpenAddHorario()}>
            Adicionar Horario
          </Button>
          <Button variant="contained" onClick={() => handleHorarioTypeClick(selectedHorarioType)}>
            Horários
          </Button>
        </div>
      </div>
   
      {openListType === 'HorarioList' && <HorarioList horarioType={selectedHorarioType} />}
      {openListType === 'MonitorList' && <MonitorList monitorType={selectedMonitorType} />}
      {openListType === 'DisciplinasList' && <DisciplinasList disciplinaType={selectedDisciplinaType} />} 
        <MonitorRestricted
          openAddMonitor={openAddMonitor}
          handleCloseAddMonitor={handleCloseAddMonitor}
        />
        <DisciplinasRestricted
          openAddDisciplinas={openAddDisciplinas}
          handleCloseAddDisciplinas={handleCloseAddDisciplinas}
        />
        <HorarioRestricted
          openAddHorario={openAddHorario}
          handleCloseAddHorario={handleCloseAddHorario}
        />
      </div>
   
  );
};

export default Lista;

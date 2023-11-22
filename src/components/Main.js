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
  const [showHorarioList, setShowHorarioList] = useState(false);
  const [selectedMonitorType, setSelectedMonitorType] = useState(null);
  const [showMonitorList, setShowMonitorList] = useState(false);
  const [selectedDisciplinaType, setSelectedDisciplinaType] = useState(null);
  const [showDisciplinasList, setShowDisciplinasList] = useState(false);
  const [openAddMonitor, setOpenAddMonitor] = useState(false);
  const [openAddDisciplinas, setOpenAddDisciplinas] = useState(false);
  const [openAddHorario, setOpenAddHorario] = useState(false);

  

  const handleHorarioTypeClick = (horarioType) => {
    setSelectedHorarioType(horarioType);
    setShowHorarioList(true);
  };

  const handleMonitorTypeClick = (monitorType) => {
    setSelectedMonitorType(monitorType);
    setShowMonitorList(true);
  };

  const handleDisciplinaTypeClick = (disciplinaType) => {
    setSelectedDisciplinaType(disciplinaType);
    setShowDisciplinasList(true);
  };

  const handleOpenAddMonitor = () => {
    setOpenAddMonitor(true);
  };

  const handleCloseAddMonitor = () => {
    setOpenAddMonitor(false);
  };

  const handleOpenAddDisciplinas = () => {
    setOpenAddDisciplinas(true);
  };

  const handleCloseAddDisciplinas = () => {
    setOpenAddDisciplinas(false);
  };

  const handleOpenAddHorario = () => {
    setOpenAddHorario(true);
  };

  const handleCloseAddHorario = () => {
    setOpenAddHorario(false);
  };
  const handleCloseModal = () => {
    setShowHorarioList(false);
    setShowMonitorList(false);
    setShowDisciplinasList(false);
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h5">Gerir Monitores</Typography>
  
      <div className="actions">
        <Button variant="contained" onClick={handleOpenAddMonitor}>
          Adicionar Novo Monitor
        </Button>
        <Button
          variant="contained"
          onClick={() => handleMonitorTypeClick("MD")}
        >
          Monitores MD
        </Button>
        <Button
          variant="contained"
          onClick={() => handleMonitorTypeClick("MIDIT")}
        >
          Monitores MIDIT
        </Button>
      </div>
      </div>
      <div className="header">
        <Typography variant="h5">Gerir Disciplinas</Typography>
 
      <div className="actions">
      <Button
          variant="contained"
          onClick={() => handleOpenAddDisciplinas()}
        >
        Adicionar nova disciplina
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDisciplinaTypeClick()}
        >
          Disciplinas
        </Button>
      </div>
      </div>
      <div className="header">
        <Typography variant="h5">Gerir Horarios</Typography>
      <div className="actions">
      <Button
          variant="contained"
          onClick={() => handleOpenAddHorario()}
        >
        Adicionar nova Horario
        </Button>
        <Button
          variant="contained"
          onClick={() => handleHorarioTypeClick(selectedHorarioType)}
        >
          Horários
        </Button>

        </div>
      </div>
      <div className="main-content">
        {showHorarioList && <HorarioList horarioType={selectedHorarioType} />}
        {showMonitorList && <MonitorList monitorType={selectedMonitorType} />}
        {showDisciplinasList && (
          <DisciplinasList disciplinaType={selectedDisciplinaType} />
        )}
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
    </div>
  );
};
export default Lista;

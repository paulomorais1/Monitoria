import React, { useState } from "react";
import { Typography, Button, Modal, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import DisciplinasList from "./DisciplinasList";
import AddDisciplinas from "./AddDisciplinas"; // Certifique-se de ter um componente AddDisciplinas

const DisciplinasRestricted = ({ isAuthenticated }) => {
  const [openAddDisciplinas, setOpenAddDisciplinas] = useState(false);
  const [selectedDisciplinaType, setSelectedDisciplinaType] = useState(null);

  const handleOpenAddDisciplinas = () => {
    setOpenAddDisciplinas(true);
  };

  const handleCloseAddDisciplinas = () => {
    setOpenAddDisciplinas(false);
  };

  const handleDisciplinaTypeClick = (disciplinaType) => {
    setSelectedDisciplinaType(disciplinaType);
  };

  const getDisciplinas = () => {
    console.log("Obtendo disciplinas...");
    // Implemente a lógica para obter as disciplinas, se necessário
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Gerir Disciplinas</Typography>
      </div>
      <div className="actions">
        <Button variant="contained" onClick={handleOpenAddDisciplinas}>
          Adicionar Nova Disciplina
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDisciplinaTypeClick("DisciplinaA")}
        >
        Disciplinas
        </Button>
      
      </div>
      <div className="main-content">
        <DisciplinasList disciplinaType={selectedDisciplinaType} />
        <Modal
          open={openAddDisciplinas}
          onClose={handleCloseAddDisciplinas}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: "0px 0px 5px #ccc",
              p: 4,
            }}
          >
            <AddDisciplinas getDisciplinas={getDisciplinas} />
            <ToastContainer />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DisciplinasRestricted;

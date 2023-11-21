import React, { useState } from "react";
import { Typography, Button, Modal, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import HorarioList from "./HorarioList";
import AddHorario from "./AddHorario"; // Certifique-se de ter um componente AddHorario

const HorarioRestricted = ({ isAuthenticated }) => {
  const [openAddHorario, setOpenAddHorario] = useState(false);
  const [selectedHorarioType, setSelectedHorarioType] = useState(null);

  const handleOpenAddHorario = () => {
    setOpenAddHorario(true);
  };

  const handleCloseAddHorario = () => {
    setOpenAddHorario(false);
  };

  const handleHorarioTypeClick = (horarioType) => {
    setSelectedHorarioType(horarioType);
  };

  const getHorarios = () => {
    console.log("Obtendo horários...");
    // Implemente a lógica para obter os horários, se necessário
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Gerir Horários</Typography>
      </div>
      <div className="actions">
        <Button variant="contained" onClick={handleOpenAddHorario}>
          Adicionar Novo Horário
        </Button>
        <Button
          variant="contained"
          onClick={() => handleHorarioTypeClick("HorarioA")}
        >
          Horários
        </Button>
      </div>
      <div className="main-content">
        <HorarioList horarioType={selectedHorarioType} />
        <Modal
          open={openAddHorario}
          onClose={handleCloseAddHorario}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: 400,
                bgcolor: "background.paper",
                boxShadow: "0px 0px 5px #ccc",
                p: 4,
              }}
            >
              <AddHorario getHorarios={getHorarios} />
              <ToastContainer />
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default HorarioRestricted;

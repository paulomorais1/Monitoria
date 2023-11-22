import React from "react";
import { Modal, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

import AddHorario from "./AddHorario";

const HorarioRestricted = ({  openAddHorario, handleCloseAddHorario}) => {
  const getHorarios = () => {
    console.log("Obtendo horários...");
    // Implemente a lógica para obter os horários, se necessário
  };

  return (
  
        <Modal
          open={openAddHorario}
          onClose={handleCloseAddHorario}
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
            <AddHorario getHorarios={getHorarios} />
            <ToastContainer />
          </Box>
        </Modal>


  );
};

export default HorarioRestricted;

import React from "react";
import { Modal, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AddDisciplinas from "./AddDisciplinas";

const DisciplinasRestricted = ({openAddDisciplinas, handleCloseAddDisciplinas  }) => {



  const getDisciplinas = () => {
    console.log("Obtendo disciplinas...");
    // Implemente a lógica para obter as disciplinas, se necessário
  };

  return (

  
      <div className="main-content">
      
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
  );
};

export default DisciplinasRestricted;

import React from "react";
import { Modal, Box } from "@mui/material";
import "./MonitorRestricted.css";
import { ToastContainer } from "react-toastify";

import AddMonitor from "./AddMonitor";

const MonitorRestricted = ({ openAddMonitor, handleCloseAddMonitor }) => {

  const getUsers = () => {
    console.log("Obtendo usuários...");
  };

  return (


      
        <Modal
          open={openAddMonitor}
          onClose={handleCloseAddMonitor}
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
            <AddMonitor getUsers={getUsers} />
            <ToastContainer />
          </Box>
        </Modal>


  );
};

export default MonitorRestricted;

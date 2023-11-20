import React, { useState } from "react";
import { Typography, Button, Modal, Box } from "@mui/material";
import "./restrictedArea.css";
import { ToastContainer } from "react-toastify";
import MonitorList from "./MonitorList";
import AddMonitor from "../Monitor/AddMonitor";


const RestrictedArea = ({ isAuthenticated }) => {
  const [openAddMonitor, setOpenAddMonitor] = useState(false);
  const [selectedMonitorType, setSelectedMonitorType] = useState(null);

  const handleOpenAddMonitor = () => {
    setOpenAddMonitor(true);
  };

  const handleCloseAddMonitor = () => {
    setOpenAddMonitor(false);
  };

  const handleMonitorTypeClick = (monitorType) => {
    setSelectedMonitorType(monitorType);
  };

  const getUsers = () => {
    console.log("Obtendo usuários...");
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Gerir Monitores</Typography>
      </div>
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
   
      <div className="main-content">
        <MonitorList monitorType={selectedMonitorType} />
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
      </div>
    </div>
  );
};

export default RestrictedArea;

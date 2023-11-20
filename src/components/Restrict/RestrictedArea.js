import React, { useState } from 'react';
import { Typography, Button, Modal, Box } from '@mui/material';
import './restrictedArea.css';
import { ToastContainer } from 'react-toastify';

import MonitorList from './MonitorList';
import AddMonitor from '../Monitor/AddMonitor';

const RestrictedArea = ({ isAuthenticated }) => {
  console.log('Renderizando o componente RestrictedArea');

  const [openAddMonitor, setOpenAddMonitor] = useState(false);

  const handleOpenAddMonitor = () => {
    setOpenAddMonitor(true);
  };

  const handleCloseAddMonitor = () => {
    setOpenAddMonitor(false);
  };
  const getUsers = () => {
    console.log('Obtendo usuários...'); 
  };


  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Área Restrita</Typography>
      </div>
      <div className="actions">
        <Typography variant="h5">Ações Disponíveis</Typography>
        <Button variant="contained" onClick={handleOpenAddMonitor}>
          Adicionar Novo Monitor
        </Button>
        <Button variant="contained">Editar Monitores</Button>
        <Button variant="contained">Iniciar Novo Processo de Seleção</Button>
      </div>
      <div className="main-content">
        <MonitorList element  />
        <Modal
          open={openAddMonitor}
          onClose={handleCloseAddMonitor}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',      
              boxShadow: '0px 0px 5px #ccc',
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

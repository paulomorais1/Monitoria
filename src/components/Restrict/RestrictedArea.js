// src/components/Restrict/RestrictedArea.js
import React from 'react';
import { Typography, Button } from '@mui/material';
import './restrictedArea.css'
import MonitorList from './MonitoringList';
const RestrictedArea = ({ isAuthenticated }) => {
  console.log('Renderizando o componente RestrictedArea');

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4">Área Restrita</Typography>
      </div>

      <div className="main-content">
      <MonitorList />

        <div className="actions">
          <Typography variant="h5">Ações Disponíveis</Typography>
          <Button variant="contained">Adicionar Novo Monitor</Button>
          <Button variant="contained">Editar Monitores</Button>
          <Button variant="contained">Iniciar Novo Processo de Seleção</Button>
        </div>
      </div>
    </div>
  );
};

export default RestrictedArea;

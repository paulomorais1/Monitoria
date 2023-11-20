/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UpdateMonitor from "../Monitor/UpdateMonitor";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import './MonitorList.css';



const MonitorList = ({ monitorType }) => {
  const [monitorData, setMonitorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMonitorID, setEditingMonitorID] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    const getMonitorData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Monitores/getMonitores.php"
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Conteúdo da resposta não é JSON.");
        }

        const data = await response.json();

        const filteredMonitors = data.monitors.filter(
          (monitor) => monitor.Tipo === monitorType
        );

        setMonitorData(filteredMonitors);

        setShowSuccessToast(true); // Exemplo de toast de sucesso
      } catch (error) {
        console.error("Erro ao obter dados do monitor:", error.message);
        setError(
          "Erro ao obter dados do monitor. Verifique a console para detalhes."
        );
        setShowErrorToast(true); // Exemplo de toast de erro
      } finally {
        setLoading(false);
      }
    };

    getMonitorData();
  }, [monitorType]);

  const handleEditClick = (monitorID) => {
    setEditingMonitorID(monitorID);
  };

  const closeModal = () => {
    setEditingMonitorID(null);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessToast(false);
    setShowErrorToast(false);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <h5 className="mb-4">
            {monitorType === 'MD'  ? 'Monitores MD' : 'MD' || monitorType === 'MIDIT' ? 'Programa de Monitoria de Iniciação em Desenvolvimento Tecnológico e Inovação ' : ' MIDTI'
}

            </h5>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ra</th>
                  <th>Tipo</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {monitorData.map((monitor) => (
                  <tr key={monitor.ID}>
                    <td>{monitor.ID}</td>
                    <td>{monitor.Nome}</td>
                    <td>{monitor.Email}</td>
                    <td>{monitor.Ra}</td>
                    <td>{monitor.Tipo}</td>
                    <td>
                      <button onClick={() => handleEditClick(monitor.ID)}>
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={editingMonitorID !== null} onClose={closeModal}>
        <DialogTitle>Editar Monitor</DialogTitle>
        <DialogContent>
          {editingMonitorID !== null && (
            <UpdateMonitor
              monitorDataForUpdate={monitorData.find(
                (monitor) => monitor.ID === editingMonitorID
              )}
              onUpdate={() => {
                setShowSuccessToast(true); // Exemplo de toast de sucesso após a atualização
                closeModal();
              }}
              onCancel={closeModal}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Toasts */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={2000}
        onClose={handleToastClose}
      >
        <MuiAlert onClose={handleToastClose} severity="success" sx={{ width: "100%" }}>
          Operação realizada com sucesso!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={showErrorToast}
        autoHideDuration={2000}
        onClose={handleToastClose}
      >
        <MuiAlert onClose={handleToastClose} severity="error" sx={{ width: "100%" }}>
          Ops! Algo deu errado. Verifique a console para detalhes.
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
};

export default MonitorList;

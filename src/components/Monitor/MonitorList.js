/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./MonitorList.css";
import DeleteMonitor from "./DeleteMonitor";
import { toast } from "react-toastify";
import UpdateMonitor from "./UpdateMonitor"; // Importe o componente UpdateMonitor

const MonitorList = ({ monitorType, onDelete }) => {
  const [monitorData, setMonitorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMonitorID, setEditingMonitorID] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [deletedMonitorID, setDeletedMonitorID] = useState(null);

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
  }, [monitorType, deletedMonitorID]);

  const handleEditClick = (monitorID) => {
    setEditingMonitorID(monitorID);
  };

  const handleDeleteClick = async () => {
    try {
      await onDelete(deletedMonitorID);
      setDeletedMonitorID(null);
    } catch (error) {
      console.error("Erro ao processar exclusão:", error);
    }
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
        {/* ... (restante do seu código) */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ra</th>
              <th>Tipo</th>
              <th>Editar</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {monitorData.map((monitor) => (
              <tr key={monitor.ID}>
                {/* ... (restante do seu código) */}
                <td>
                  <button onClick={() => handleEditClick(monitor.ID)}>
                    Editar
                  </button>
                </td>
                <td>
                  <DeleteMonitor
                    setError={setError}
                    toast={toast}
                    onDelete={(deletedID) => setDeletedMonitorID(deletedID)}
                    setLoading={setLoading}
                    monitorData={monitor}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
          autoHideDuration={1000}
          onClose={handleToastClose}
        >
          <MuiAlert
            onClose={handleToastClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Operação realizada com sucesso!
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={showErrorToast}
          autoHideDuration={1000}
          onClose={handleToastClose}
        >
          <MuiAlert
            onClose={handleToastClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Ops! Algo deu errado. Verifique a console para detalhes.
          </MuiAlert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
};

export default MonitorList;
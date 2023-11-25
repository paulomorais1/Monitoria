/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Paper
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteDisciplina from "./DeleteDisciplina";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import UpdateDisciplina from "./UpdateDisciplina";
import styled from "styled-components";



const DisciplinaListContainer = styled(Paper)`
  margin: 20px auto;
  padding: 20px;

  h2 {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    button {
      margin-right: 5px;
    }
  }
`;
const DisciplinasList = ({ disciplinaType, onDelete, getDisciplinas }) => {
  const [disciplinaData, setDisciplinaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDisciplinaID, setEditingDisciplinaID] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [deletedDisciplinaID, setDeletedDisciplinaID] = useState(null);

  useEffect(() => {
    const getDisciplinaData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Disciplinas/getDisciplinas.php"
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Conteúdo da resposta não é JSON.");
        }

        const data = await response.json();

        if (data.disciplinas) {
          setDisciplinaData(data.disciplinas);
          setShowSuccessToast(true); // Exemplo de toast de sucesso
        } else {
          throw new Error("Dados de disciplina não encontrados na resposta.");
        }
      } catch (error) {
        console.error("Erro ao obter dados da disciplina:", error.message);
        setError(
          "Erro ao obter dados da disciplina. Verifique a console para detalhes."
        );
        setShowErrorToast(true); // Exemplo de toast de erro
      } finally {
        setLoading(false);
      }
    };

    getDisciplinaData();
  }, [disciplinaType, deletedDisciplinaID]);

  const handleEditClick = (disciplinaID) => {
    setEditingDisciplinaID(disciplinaID);
  };

  const handleDeleteClick = async () => {
    try {
      await onDelete(deletedDisciplinaID); // Atualiza o estado no componente pai, se necessário
      setDeletedDisciplinaID(null); // Limpa o ID da disciplina excluída
    } catch (error) {
      console.error("Erro ao processar exclusão:", error);
    }
  };

  const closeModal = () => {
    setEditingDisciplinaID(null);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccessToast(false);
    setShowErrorToast(false);
  };

  return (
    <DisciplinaListContainer>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <h2 className="mb-4">
          Lista de Disciplinas 
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Professor</th>
                  <th>Editar</th>
                  <th>Del</th>
                </tr>
              </thead>
              <tbody>
                {disciplinaData.map((disciplina) => (
                  <tr key={disciplina.ID}>
                    <td>{disciplina.ID}</td>
                    <td>{disciplina.Nome}</td>
                    <td>{disciplina.Professor}</td>
                    <td>
                   
              <EditIcon onClick={() => handleEditClick(disciplina.ID)}/>
              
                    </td>
                    <td>
                      <DeleteDisciplina
                        setError={setError}
                        toast={toast}
                        onDelete={(deletedID) =>
                          setDeletedDisciplinaID(deletedID)
                        }
                        setLoading={setLoading}
                        disciplinaData={disciplina}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={editingDisciplinaID !== null} onClose={closeModal}>
        <DialogTitle>Editar Disciplina</DialogTitle>
        <DialogContent>
          {editingDisciplinaID !== null && (
            <UpdateDisciplina
              disciplinaDataForUpdate={disciplinaData.find(
                (disciplina) => disciplina.ID === editingDisciplinaID
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
    </DisciplinaListContainer>
  );
};

export default DisciplinasList;

import React, { useState, useEffect } from "react";

const MonitorList = () => {
  const [monitorData, setMonitorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMonitorData = async () => {
      try {
        console.log('Antes do fetch');
        const response = await fetch("http://localhost:8080/getMonitores.php");
        console.log('Depois do fetch');

        // Verifique o conteúdo da resposta
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Conteúdo da resposta não é JSON.");
        }

        const data = await response.json();
        console.log(data);
        setMonitorData(data.monitors);
      } catch (error) {
        console.error("Erro ao obter dados do monitor:", error.message);
        setError("Erro ao obter dados do monitor. Verifique a console para detalhes.");
      } finally {
        setLoading(false);
      }
    };

    // Chame a função imediatamente
    getMonitorData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <h5 className="mb-4">Monitor List</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ra</th>
                  <th>Tipo</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MonitorList;

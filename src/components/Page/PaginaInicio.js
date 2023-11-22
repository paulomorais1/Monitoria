import React, { useState, useEffect } from "react";

const MonitorCard = () => {
  const [monitoresData, setMonitoresData] = useState([]);
  const [horariosData, setHorariosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMonitorData = async () => {
      try {
        const response = await fetch("http://localhost:8080/Page/getPage.php");
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Conteúdo da resposta não é JSON.");
        }

        const data = await response.json();
        console.log("Data received:", data); // Add this line

        if (data.monitores && data.horarios) {
          setMonitoresData(data.monitores);
          setHorariosData(data.horarios);
        } else {
          throw new Error("Dados de monitores ou horários não encontrados na resposta.");
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error.message);
        setError(
          "Erro ao obter dados. Verifique a console para detalhes."
        );
      } finally {
        setLoading(false);
      }
    };

    // Call the function when the component mounts (empty dependency array)
    getMonitorData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Monitores</h1>
      {monitoresData.map((monitor, index) => (
        <div key={index} className="card">
          <h2>{monitor.nome}</h2>
          <p>RA: {monitor.ra}</p>
          <p>Email: {monitor.email}</p>
          {/* Add additional fields as needed */}
        </div>
      ))}
      {horariosData.map((horario, index) => (
        <div key={index} className="card">
          <p>Disciplina: {horario.DisciplinaID}</p>
          <p>Dia da Semana: {horario.DiaSemana}</p>
          <p>Horário: {horario.HorarioInicio} às {horario.HorarioTermino}</p>
          {/* Add additional fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default MonitorCard;

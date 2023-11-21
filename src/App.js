import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Restrict/Login';
import ErrorBoundary from './components/ErrorBoundary'; // Adicione esta linha
import MonitorRestricted from './components/Monitor/MonitorRestricted';
import DisciplinasRestricted from './components/Disciplinas/DisciplinasRestricted';
import HorarioRestricted from './components/Horario/HorarioRestricted';
import Main from './components/Main';
const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <ErrorBoundary> {/* Adicione esta linha */}
        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/Main" /> : <Navigate to="/login" />
            }
          />
          <Route path="/gerir-monitores" element={<MonitorRestricted />} />

          <Route path="/gerir-disciplinas" element={<DisciplinasRestricted />} />
          <Route path="/gerir-horario" element={<HorarioRestricted />} />
         
          <Route
            path="/restricted-area"
            element={isAuthenticated ? <Main /> : <Navigate to="/login" />}
          />
        </Routes>
      </ErrorBoundary> {/* Adicione esta linha */}
    </Router>
  );
};

export default App;

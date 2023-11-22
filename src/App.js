import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Restrict/Login';
import ErrorBoundary from './components/ErrorBoundary';
import MonitorCard from './components/Page/PaginaInicio';
import Main from './components/Main';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/monitor" element={<MonitorCard />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                // Se autenticado, redireciona para a página principal
                <Navigate to="/Main" />
              ) : (
                // Se não autenticado, exibe a página MonitorCard
                <MonitorCard />
              )
            }
          />
          <Route
            path="/restricted-area"
            element={isAuthenticated ? <Main /> : <Navigate to="/login" />}
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

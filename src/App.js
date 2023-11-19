import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OpenSelectionProcess from './components/OpenSelectionProcess';
import ClassRanking from './components/ClassRanking';
import RestrictedArea from './components/Restrict/RestrictedArea';
import Login from './components/Restrict/Login';
import ErrorBoundary from './components/ErrorBoundary'; // Adicione esta linha

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
              isAuthenticated ? <Navigate to="/restricted-area" /> : <Navigate to="/login" />
            }
          />
          <Route path="/open-selection-process" element={<OpenSelectionProcess />} />
         
          <Route path="/class-ranking" element={<ClassRanking />} />
          <Route
            path="/restricted-area"
            element={isAuthenticated ? <RestrictedArea /> : <Navigate to="/login" />}
          />
        </Routes>
      </ErrorBoundary> {/* Adicione esta linha */}
    </Router>
  );
};

export default App;

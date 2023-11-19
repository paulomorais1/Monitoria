// src/components/OpenSelectionProcess.js
import React, { useState } from "react";
import api from "../services/Api";

const OpenSelectionProcess = () => {
  const [processType, setProcessType] = useState("");

  const handleOpenProcess = async () => {
    try {
      await api.post("/open-selection-process", { processType });
      alert("Selection process opened successfully!");
    } catch (error) {
      console.error("Error opening selection process:", error);
    }
  };

  return (
    <div>
      <h2>Open Selection Process</h2>
      <label>
        Process Type:
        <input
          type="text"
          value={processType}
          onChange={(e) => setProcessType(e.target.value)}
        />
      </label>
      <button onClick={handleOpenProcess}>Open Process</button>
    </div>
  );
};

export default OpenSelectionProcess;

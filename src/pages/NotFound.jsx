import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="error-container">
        <div className="error-number">4</div>
        <div className="error-planet">
          <div className="orbit"></div>
          <div className="planet"></div>
        </div>
        <div className="error-number">4</div>
      </div>
      <h2 className="error-message">¡Oops! Página no encontrada</h2>
      <p className="error-description">
        La página que estás buscando parece haberse perdido en el espacio.
      </p>
      <button className="home-button" onClick={handleGoHome}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default NotFound;

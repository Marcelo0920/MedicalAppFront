import React from "react";
import { Link } from "react-router-dom";

const RevisionCard = ({ revision, cod }) => {
  return (
    <Link to={`/revisionresultado/${revision.index}`} className="revision-card">
      <div className="revision-header">
        <div>
          <h3>{revision.type}</h3>
          <span className="date-tag">28-11-2024</span>
        </div>
        <button className="edit-button">✏️</button>
      </div>
      <div className="revision-details">
        <div className="detail-item">
          <label>Doctor</label>
          <span>{revision.nombre_doctor}</span>
        </div>
        <div className="detail-item">
          <label>Codigo :</label>
          <span>{cod}</span>
        </div>
        <div className="detail-item">
          <label>Hospital :</label>
          <span> San Juan De Dios</span>
        </div>
      </div>
    </Link>
  );
};

export default RevisionCard;

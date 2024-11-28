import React, { useState } from "react";
import "./PatientCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateFormatter";
import CreatePatientModal from "../../Modals/CreatePatientModal/CreatePatientModal";

const PatientCard = ({ patient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(patient);

  return (
    <>
      <div className="patient-card">
        <div className="patient-header">
          <div>
            <h3>{patient.nombre}</h3>
            <span className="date-tag">{formatDate(patient.createdAt)}</span>
          </div>
          <button className="edit-button" onClick={() => setIsModalOpen(true)}>
            ✏️
          </button>
        </div>
        <Link to={`/patientprofile/${patient.id}`} className="patient-info">
          <div className="info-row">
            <span className="label">Grupo Sanguineo:</span>
            <span>ORH+</span>
            <span className="label">CI:</span>
            <span>{patient.ci}</span>
          </div>
          <div className="info-row">
            <span className="label">Edad:</span>
            <span>{patient.edad} años</span>
          </div>
          <div className="info-row">
            <span className="label">Telefono:</span>
            <span>{patient.telefono}</span>
          </div>
        </Link>
      </div>
      <CreatePatientModal
        isOpen={isModalOpen}
        paciente={patient}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PatientCard;

import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./PatientSelectionModal.css";

const PatientSelectionModal = ({
  isOpen,
  onClose,
  onSelectPatient,
  paciente: { pacientes },
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredPatients = pacientes
    .filter(
      (patient) =>
        patient.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.telefono.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 4); // Only take the first 4 results

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Buscar Paciente</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-search">
          <div className="search-box-modal">
            <input
              type="text"
              placeholder="Buscar Paciente"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="recent-searches">
            <p className="recent-title">
              {searchQuery ? "Resultados" : "Busquedas recientes"}
            </p>
            <div className="patient-list-modal">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="patient-item"
                  onClick={() => onSelectPatient(patient)}
                >
                  <div className="patient-avatar">
                    <img
                      src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                      alt={patient.nombre}
                    />
                  </div>
                  <div className="patient-info">
                    <span className="patient-name">{patient.nombre}</span>
                    <span className="patient-ci">{patient.telefono}</span>
                  </div>
                </div>
              ))}
              {searchQuery && filteredPatients.length === 0 && (
                <div className="no-results">No se encontraron pacientes</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  paciente: state.paciente,
});

PatientSelectionModal.propTypes = {
  auth: PropTypes.object.isRequired,
  paciente: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(PatientSelectionModal);

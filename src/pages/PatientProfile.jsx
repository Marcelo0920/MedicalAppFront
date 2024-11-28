import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import RevisionCard from "../components/Patient/RevisionCard/RevisionCardList";
import HistoricClinicCardsList from "../components/Patient/HistoricClinic/HistoricClinicCardsList/HistoricClinicCardsList";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Styles/patientProfile.css";
import { getPaciente } from "../actions/paciente";

import { useParams } from "react-router-dom";
import { getConsultas } from "../actions/consulta";

const PatientProfile = ({
  getConsultas,
  getPaciente,
  paciente: { paciente },
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("revisiones");
  const { id } = useParams();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log(paciente);

  useEffect(() => {
    if (id) {
      getPaciente(id);
    }
  }, [id]);

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
        <Header onMenuClick={toggleSidebar} />
        <div className="patient-profile-container">
          <h1>Paciente</h1>

          <div className="profile-content">
            <div className="patient-info-card">
              <div className="patient-header">
                <img
                  src="/api/placeholder/120/120"
                  alt="Patient"
                  className="patient-avatar-profile"
                />
                <div className="patient-details">
                  <div className="detail-group">
                    <label>Nombre</label>
                    <span>{paciente?.nombre}</span>
                  </div>
                  <div className="detail-group">
                    <label>Edad</label>
                    <span>{paciente?.edad}</span>
                  </div>
                  <div className="detail-group">
                    <label>Grupo Sanguíneo</label>
                    <span>ORH +</span>
                  </div>
                  <div className="detail-group">
                    <label>Phone no :</label>
                    <span>{paciente?.telefono}</span>
                  </div>
                </div>
                <div className="patient-details secondary">
                  <div className="detail-group">
                    <label>Codigo Paciente :</label>
                    <span>{paciente?.id}</span>
                  </div>
                  <div className="detail-group">
                    <label>Correo :</label>
                    <span>{paciente?.email}</span>
                  </div>
                  <div className="detail-group">
                    <label>CI :</label>
                    <span>12533985</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="history-section">
              <div className="tabs-profile">
                <button
                  className={`tab-profile ${
                    activeTab === "revisiones" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("revisiones")}
                >
                  Revisiones
                </button>
                <button
                  className={`tab-profile ${
                    activeTab === "historia" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("historia")}
                >
                  Historia Clínica
                </button>
              </div>

              <div className="search-bar-history">
                <input
                  type="text"
                  placeholder="Buscar por código..."
                  className="search-input"
                />
                <button className="filter-button">Filtrar</button>
              </div>

              {activeTab === "revisiones" ? (
                <RevisionCard />
              ) : (
                <HistoricClinicCardsList />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PatientProfile.propTypes = {
  getPaciente: PropTypes.func.isRequired,
  getConsultas: PropTypes.func.isRequired,
  paciente: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  paciente: state.paciente,
});

export default connect(mapStateToProps, { getPaciente, getConsultas })(
  PatientProfile
);

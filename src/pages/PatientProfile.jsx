import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import RevisionCard from "../components/Patient/RevisionCard/RevisionCardList";
import HistoricClinicCardsList from "../components/Patient/HistoricClinic/HistoricClinicCardsList/HistoricClinicCardsList";
import "./styles/PatientProfile.css";

const PatientProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("revisiones");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const patientData = {
    nombre: "María Galindo",
    edad: "28 años",
    grupoSanguineo: "ORH +",
    phoneNo: "9876543210",
    codigoPaciente: "9876543210",
    correo: "correo@gmail.com",
    ci: "12533957",
  };

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
                    <span>{patientData.nombre}</span>
                  </div>
                  <div className="detail-group">
                    <label>Edad</label>
                    <span>{patientData.edad}</span>
                  </div>
                  <div className="detail-group">
                    <label>Grupo Sanguíneo</label>
                    <span>{patientData.grupoSanguineo}</span>
                  </div>
                  <div className="detail-group">
                    <label>Phone no :</label>
                    <span>{patientData.phoneNo}</span>
                  </div>
                </div>
                <div className="patient-details secondary">
                  <div className="detail-group">
                    <label>Codigo Paciente :</label>
                    <span>{patientData.codigoPaciente}</span>
                  </div>
                  <div className="detail-group">
                    <label>Correo :</label>
                    <span>{patientData.correo}</span>
                  </div>
                  <div className="detail-group">
                    <label>CI :</label>
                    <span>{patientData.ci}</span>
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

export default PatientProfile;

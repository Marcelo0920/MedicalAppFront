import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import PatientSelectionModal from "../components/Modals/PatientSelectionModal/PatientSelectionModal";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { iaAnalisis, iaLoading } from "../actions/ia";
import "@pages/styles/revision.css";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { setPaciente } from "../actions/paciente";

const Loader = () => (
  <div className="loader-overlay">
    <div className="loader-content">
      <div className="loader-spinner"></div>
      <p>Procesando Imagen...</p>
    </div>
  </div>
);

const Revision = ({
  setPaciente,
  iaAnalisis,
  iaLoading,
  ia: { loading, error },
  paciente: { paciente },
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  console.log(loading);

  useEffect(() => {
    if (!loading && shouldNavigate) {
      setShouldNavigate(true);
    }
  }, [loading, shouldNavigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //SELECCIONAR UN PACIENTE PARA LA REVISION
  const handleSelectPatient = (patient) => {
    console.log("Selected patient:", patient);
    setPaciente(patient);
    setIsModalOpen(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (selectedFile) {
      try {
        // Primero activamos el loading
        iaLoading(selectedFile);

        // Luego hacemos el análisis
        await iaAnalisis(selectedFile);

        // Una vez completado el análisis, verificamos si hay error en el analisis o no
        if (error) {
          toast.error("Error al analizar la Imagen", { theme: "light" });
        } else {
          setShouldNavigate(true);
        }
      } catch (error) {
        console.error("Error en handleAnalyze:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="app">
        {!loading && shouldNavigate && (
          <Navigate to="/revisionresultado" replace />
        )}
        {loading && <Loader />}
        <PatientSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectPatient={handleSelectPatient}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
          <Header onMenuClick={toggleSidebar} />
          <div className="revision-container">
            <div className="revision-header">
              <h1>Hacer Revisión</h1>
            </div>

            <div className="revision-tabs">
              <button className="tab active">Revisión con IA</button>
            </div>

            <div className="revision-content">
              <div className="upload-section">
                <div
                  className="upload-area"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Imagen seleccionada"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <div className="upload-placeholder">
                      <span className="upload-icon">+</span>
                      <p>Clickee acá para subir una imagen</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>

                <div className="revision-sidebar">
                  <div className="recommendations-card">
                    <h3>Recomendaciones</h3>
                    <p>Recuerda que esta es una aproximación</p>
                    <p>
                      Lee bien el análisis de la IA y luego redacta el tuyo.
                    </p>
                  </div>

                  {!paciente ? (
                    <button
                      className="select-patient-btn"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span className="user-icon">👤</span>
                      Seleccionar Paciente
                    </button>
                  ) : (
                    <button
                      className="select-patient-btn"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span className="user-icon">👤</span>
                      {paciente.nombre}
                    </button>
                  )}

                  <button
                    className="analyze-btn"
                    onClick={handleAnalyze}
                    disabled={!selectedImage}
                  >
                    <span className="revisar-icon">🔍</span>
                    Analizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ia: state.ia,
  paciente: state.paciente,
});

Revision.propTypes = {
  iaAnalisis: PropTypes.func.isRequired,
  setPaciente: PropTypes.func.isRequired,
  iaLoading: PropTypes.func.isRequired,
  ia: PropTypes.object.isRequired,
  paciente: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { iaAnalisis, iaLoading, setPaciente })(
  Revision
);

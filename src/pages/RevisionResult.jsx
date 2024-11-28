import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { iaDefault } from "../actions/ia";

import "./Styles/revisionResult.css";
import { postDiagnostico } from "../actions/diagnostico";
import { convertToBase64 } from "../utils/convertImage";

const ImageModal = ({ isOpen, onClose, image, isBase64 }) => {
  if (!isOpen) return null;

  return (
    <div className="original-modal" onClick={onClose}>
      <div
        className="original-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="original-modal-close" onClick={onClose}>
          ×
        </button>
        <img
          src={
            isBase64
              ? `data:image/jpeg;base64,${image}`
              : URL.createObjectURL(image)
          }
          alt="Radiografía"
          className="original-modal-image"
        />
      </div>
    </div>
  );
};

const RevisionResult = ({
  ia: { currentImage, iaSuccess, diagnostico, resultImage },
  paciente: { paciente },
  iaDefault,
  postDiagnostico,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBase64Image, setIsBase64Image] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowOriginal = () => {
    setSelectedImage(currentImage);
    setIsBase64Image(false);
    setIsModalOpen(true);
  };

  const handleShowMarked = () => {
    setSelectedImage(resultImage);
    setIsBase64Image(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (iaSuccess) {
      toast.success("Imagen analizada con exito", { theme: "light" });
    }

    iaDefault();
  }, [iaSuccess]);

  const handleSave = async () => {
    console.log(currentImage);
    try {
      // Crear el nuevo registro
      const newRecord = {
        id_paciente: paciente.id,
        diagnostico_ia: diagnostico,
        imagen_original: await convertToBase64(currentImage),
        imagen_analizada: resultImage,
        fecha: new Date().toISOString(),
        nombre_paciente: paciente.nombre,
      };

      // Obtener registros existentes del localStorage o inicializar array vacío
      const existingRecords = JSON.parse(
        localStorage.getItem("diagnosticos") || "[]"
      );

      // Agregar el nuevo registro
      existingRecords.push(newRecord);

      // Guardar el array actualizado en localStorage
      localStorage.setItem("diagnosticos", JSON.stringify(existingRecords));

      toast.success("Diagnóstico guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar el diagnóstico:", error);
      toast.error("Error al guardar el diagnóstico");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="app">
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          image={selectedImage}
          isBase64={isBase64Image}
        />
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
          <Header onMenuClick={toggleSidebar} />
          <div className="revision-result-container">
            <div className="page-header">
              <h1>Resultados</h1>
              <button className="save-button" onClick={handleSave}>
                <span className="check-icon">✓</span>
                Guardar
              </button>
            </div>

            <div className="result-content">
              <div className="tab-container-revision">
                <button className="tab-revision active">Revisión con IA</button>
              </div>

              <div className="result-card">
                <div className="result-grid">
                  <div className="main-content-area">
                    <section className="diagnosis-section">
                      <h2>Diagnóstico de la IA</h2>
                      <p>{diagnostico}</p>
                    </section>

                    <section className="write-diagnosis-section">
                      <h2>Escribe tu diagnóstico</h2>
                      <textarea className="diagnosis-textarea" rows={8} />
                    </section>
                  </div>

                  <div className="info-sidebar">
                    <div className="info-item">
                      <span className="info-label">Código Paciente</span>
                      <span className="info-value">{paciente?.id}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fecha</span>
                      <span className="info-value">21/11/2024</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Paciente</span>
                      <span className="info-value">{paciente?.nombre}</span>
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    className="view-button"
                    onClick={handleShowOriginal}
                    disabled={!currentImage}
                  >
                    <span className="document-icon">📄</span>
                    Ver Radiografía Original
                  </button>
                  <button
                    className="view-button"
                    onClick={handleShowMarked}
                    disabled={!resultImage}
                  >
                    <span className="document-icon">📄</span>
                    Ver Radiografía Marcada
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

RevisionResult.propTypes = {
  iaDefault: PropTypes.func.isRequired,
  postDiagnostico: PropTypes.func.isRequired,
  ia: PropTypes.object.isRequired,
  paciente: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { iaDefault, postDiagnostico })(
  RevisionResult
);

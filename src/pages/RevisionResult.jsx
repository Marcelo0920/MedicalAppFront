import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

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
  usuario,
  iaDefault,
  postDiagnostico,
}) => {
  const { id } = useParams(); // Get the ID from URL params

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBase64Image, setIsBase64Image] = useState(false);
  const [diagnosticoDoctor, setDiagnosticoDoctor] = useState("");
  const [loadedData, setLoadedData] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if (id) {
      // Load existing diagnosis
      const diagnosticos = JSON.parse(
        localStorage.getItem("diagnosticos") || "[]"
      );
      const existingDiagnostico = diagnosticos.find(
        (d) => d.index === parseInt(id)
      );

      if (existingDiagnostico) {
        setLoadedData(existingDiagnostico);
        setDiagnosticoDoctor(existingDiagnostico.diagnostico_doctor);
        setIsViewMode(true);
      } else {
        toast.error("Diagnóstico no encontrado");
      }
    }
  }, [id]);

  useEffect(() => {
    if (iaSuccess) {
      toast.success("Imagen analizada con exito", { theme: "light" });
    }
    iaDefault();
  }, [iaSuccess]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowOriginal = () => {
    const imageToShow = loadedData ? loadedData.imagen_original : currentImage;
    setSelectedImage(imageToShow);
    setIsBase64Image(!!loadedData);
    setIsModalOpen(true);
  };

  const handleShowMarked = () => {
    const imageToShow = loadedData ? loadedData.imagen_analizada : resultImage;
    setSelectedImage(imageToShow);
    setIsBase64Image(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const existingRecords = JSON.parse(
        localStorage.getItem("diagnosticos") || "[]"
      );
      const newIndex =
        existingRecords.length > 0
          ? Math.max(...existingRecords.map((record) => record.index)) + 1
          : 1;

      const newRecord = {
        index: newIndex,
        id_paciente: paciente.id,
        id_doctor: usuario?.id,
        diagnostico_ia: diagnostico,
        imagen_original: await convertToBase64(currentImage),
        diagnostico_doctor: diagnosticoDoctor,
        imagen_analizada: resultImage,
        fecha: new Date().toISOString(),
        nombre_paciente: paciente.nombre,
        nombre_doctor: usuario?.nombre,
      };

      existingRecords.push(newRecord);
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
              {!isViewMode && (
                <button className="save-button" onClick={handleSave}>
                  <span className="check-icon">✓</span>
                  Guardar
                </button>
              )}
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
                      <p>
                        {loadedData ? loadedData.diagnostico_ia : diagnostico}
                      </p>
                    </section>

                    <section className="write-diagnosis-section">
                      <h2>Diagnóstico del doctor</h2>
                      <textarea
                        className="diagnosis-textarea"
                        rows={8}
                        value={diagnosticoDoctor}
                        onChange={(e) => setDiagnosticoDoctor(e.target.value)}
                        placeholder="Escribe tu diagnóstico aquí..."
                        disabled={isViewMode}
                      />
                    </section>
                  </div>

                  <div className="info-sidebar">
                    <div className="info-item">
                      <span className="info-label">Código Paciente</span>
                      <span className="info-value">
                        {loadedData ? loadedData.id_paciente : paciente?.id}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fecha</span>
                      <span className="info-value">
                        {loadedData
                          ? new Date(loadedData.fecha).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Paciente</span>
                      <span className="info-value">
                        {loadedData
                          ? loadedData.nombre_paciente
                          : paciente?.nombre}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    className="view-button"
                    onClick={handleShowOriginal}
                    disabled={!currentImage && !loadedData?.imagen_original}
                  >
                    <span className="document-icon">📄</span>
                    Ver Radiografía Original
                  </button>
                  <button
                    className="view-button"
                    onClick={handleShowMarked}
                    disabled={!resultImage && !loadedData?.imagen_analizada}
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
  usuario: state.auth.usuario,
});

RevisionResult.propTypes = {
  iaDefault: PropTypes.func.isRequired,
  postDiagnostico: PropTypes.func.isRequired,
  ia: PropTypes.object.isRequired,
  paciente: PropTypes.object.isRequired,
  usuario: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { iaDefault, postDiagnostico })(
  RevisionResult
);

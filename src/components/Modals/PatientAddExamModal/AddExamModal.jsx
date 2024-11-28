import React, { useEffect, useState } from "react";
import "./AddExamModal.css";
import { getDoctores } from "../../../actions/doctor";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { postConsulta } from "../../../actions/consulta";

const AddExamModal = ({
  isOpen,
  onClose,
  examData,
  usuario,
  getDoctores,
  doctores,
  postConsulta,
}) => {
  const { id: pacienteId } = useParams();

  const [formData, setFormData] = useState({
    paciente_id: pacienteId || "",
    medico_id: examData?.medico_id || "",
    fecha: examData?.fecha
      ? new Date(examData.fecha).toISOString().slice(0, 19)
      : new Date().toISOString().slice(0, 19),
    sintomas: examData?.sintomas || "",
    notas: examData?.notas || "",
  });

  useEffect(() => {
    if (isOpen) {
      getDoctores();
    }
  }, [isOpen, getDoctores]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      fecha: new Date(formData.fecha).toISOString().slice(0, 19),
    };
    console.log(formData);
    postConsulta(formData);

    onClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.className === "modal-overlay" && onClose()}
    >
      <div className={`modal-container ${isOpen ? "modal-enter" : ""}`}>
        <div className="modal-header">
          <h2>Agregar Historia Clínica</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="exam-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID Paciente</label>
            <input
              type="number"
              name="paciente_id"
              value={formData.paciente_id}
              onChange={handleChange}
              placeholder="Ingrese ID del paciente"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Médico</label>
            <select
              name="medico_id"
              value={formData.medico_id}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Seleccione un médico</option>
              {doctores &&
                doctores.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.nombre} - ID: {doctor.id}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Síntomas</label>
            <textarea
              name="sintomas"
              value={formData.sintomas}
              onChange={handleChange}
              placeholder="Describa los síntomas del paciente"
              className="form-input"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Notas</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Agregue notas adicionales"
              className="form-input"
              rows={3}
            />
          </div>

          <button type="submit" className="submit-button">
            Guardar Historia
          </button>

          <p className="verify-text">Verifica que los datos sean correctos</p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario,
  doctores: state.doctor.doctores,
});

AddExamModal.propTypes = {
  usuario: PropTypes.object.isRequired,
  doctores: PropTypes.array,
  getDoctores: PropTypes.func.isRequired,
  postConsulta: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getDoctores, postConsulta })(
  AddExamModal
);

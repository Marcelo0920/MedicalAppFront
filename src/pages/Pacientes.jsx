import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "@pages/styles/home.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import PatientList from "../components/Patient/PatientList/PatientList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginDefault } from "../actions/auth";
import { defaultPaciente } from "../actions/paciente";

const Pacientes = ({
  loginDefault,
  defaultPaciente,
  auth: { loginSuccess },
  paciente: { creationSuccess, error, msg },
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log(loginSuccess);
    if (loginSuccess) {
      toast.success("Iniciado sesion con Exito", { theme: "light" });
    }

    if (creationSuccess) {
      if (msg == "") {
        toast.success("Paciente creado con Exito", { theme: "light" });
      } else {
        toast.success("Paciente actualizado con Exito", { theme: "light" });
      }
    }

    if (error) {
      toast.error("Hubo un error, intente mas tarde", { theme: "light" });
    }

    loginDefault();
    defaultPaciente();
  }, [loginSuccess, creationSuccess]);

  return (
    <>
      <ToastContainer />

      <div className="app">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
          <Header onMenuClick={toggleSidebar} />
          <PatientList />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  paciente: state.paciente,
});

Pacientes.propTypes = {
  loginDefault: PropTypes.func.isRequired,
  defaultPaciente: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  paciente: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { loginDefault, defaultPaciente })(
  Pacientes
);

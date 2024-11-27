import React, { useEffect, useState } from "react";

import "./Styles/home.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import DoctorsList from "../components/Doctors/DoctorsList/DoctorsList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { defaultDoctor } from "../actions/doctor";

const PersonalMedico = ({
  defaultDoctor,
  doctor: { creationSuccess, error },
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (creationSuccess) {
      toast.success("Doctor creado con Exito", { theme: "light" });
    }

    if (error) {
      toast.error("Hubo un error, intente mas tarde", { theme: "light" });
    }

    defaultDoctor();
  }, [creationSuccess]);

  return (
    <>
      <ToastContainer />

      <div className="app">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
          <Header onMenuClick={toggleSidebar} />
          <DoctorsList />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  doctor: state.doctor,
});

PersonalMedico.propTypes = {
  doctor: PropTypes.object.isRequired,
  defaultDoctor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { defaultDoctor })(PersonalMedico);

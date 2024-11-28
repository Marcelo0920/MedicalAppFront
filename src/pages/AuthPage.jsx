import React, { useEffect, useState } from "react";

import LoginCard from "../auth/LoginCard";
import RegisterCard from "../auth/RegisterCard";
import { login } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

import "@pages/styles/authPage.css";

const AuthPage = ({ login, isAuthenticated, loading, error }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    console.log(error);
    if (error == "Bad Login") {
      toast.error("Error al iniciar sesion", { theme: "light" });
    }
  }, [error]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isAuthenticated) {
    console.log("autenticado");
    console.log(isAuthenticated);
    return <Navigate to="/pacientes" replace />;
  }

  return (
    <>
      <ToastContainer />

      <div className="auth-container">
        <div className="auth-icons">
          <div className="icon-auth clipboard-icon"></div>
          <div className="icon-auth lungs-icon"></div>
        </div>

        <div className="auth-content">
          {isLoginMode ? (
            <LoginCard onSwitchMode={toggleMode} onLogin={login} />
          ) : (
            <RegisterCard onSwitchMode={toggleMode} />
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  error: state.auth.error,
});

AuthPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, { login })(AuthPage);

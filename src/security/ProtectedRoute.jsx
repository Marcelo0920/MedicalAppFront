import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth: { user } }) => {
  if (!user) {
    console.log("no user!");
    return <Navigate to="/auth" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProtectedRoute);

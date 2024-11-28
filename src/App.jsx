import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Pacientes from "./pages/Pacientes";
import Revision from "./pages/Revision";
import RevisionResult from "./pages/RevisionResult";
import PatientProfile from "./pages/PatientProfile";
import PersonalMedico from "./pages/PersonalMedico";
import AuthPage from "./pages/AuthPage";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import ProtectedRoute from "./security/ProtectedRoute";
import store from "./store";
import NotFound from "./pages/NotFound";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Pacientes />
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/pacientes"
          element={
            <ProtectedRoute>
              <Pacientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revision"
          element={
            <ProtectedRoute>
              <Revision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revisionresultado"
          element={
            <ProtectedRoute>
              <RevisionResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patientprofile"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personal-medico"
          element={
            <ProtectedRoute>
              <PersonalMedico />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

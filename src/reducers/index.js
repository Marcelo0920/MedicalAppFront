import { combineReducers } from "@reduxjs/toolkit";
import doctor from "./doctor";
import diagnostico from "./diagnostico";
import enfermero from "./enfermero";
import paciente from "./paciente";
import auth from "./auth";

export default combineReducers({
  doctor,
  paciente,
  diagnostico,
  enfermero,
  auth,
});

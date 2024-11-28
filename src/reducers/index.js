import { combineReducers } from "@reduxjs/toolkit";
import doctor from "./doctor";
import diagnostico from "./diagnostico";
import enfermero from "./enfermero";
import paciente from "./paciente";
import auth from "./auth";
import ia from "./ia";
import consulta from "./consulta";

export default combineReducers({
  doctor,
  paciente,
  diagnostico,
  enfermero,
  auth,
  ia,
  consulta,
});

import axios from "axios";

import {
  GET_PACIENTE,
  GET_PACIENTES,
  UPDATE_PACIENTE,
  POST_PACIENTE,
  ERROR_PACIENTE,
  DEFAULT_PACIENTE,
  SELECT_PACIENTE,
} from "./types";

export const getPacientes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get("http://localhost:3000/api/pacientes", config);

    dispatch({
      type: GET_PACIENTES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PACIENTE,
    });
  }
};

export const getPaciente = () => async (dispatch) => {
  try {
    console.log("getting one paciente");
    dispatch({
      type: GET_PACIENTE,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PACIENTE,
    });
  }
};

export const updatePaciente = (formData, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.put(
      `http://localhost:3000/api/pacientes/${id}`,
      formData,
      config
    );

    console.log(res.data);

    dispatch({
      type: UPDATE_PACIENTE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PACIENTE,
    });
  }
};

export const postPaciente = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.post(
      "http://localhost:3000/api/pacientes",
      formData,
      config
    );

    dispatch({
      type: POST_PACIENTE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PACIENTE,
    });
  }
};

export const defaultPaciente = () => async (dispatch) => {
  dispatch({
    type: DEFAULT_PACIENTE,
  });
};

export const setPaciente = (paciente) => (dispatch) => {
  console.log(paciente);
  dispatch({
    type: SELECT_PACIENTE,
    payload: paciente,
  });
};

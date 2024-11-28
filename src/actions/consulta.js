import axios from "axios";
import {
  GET_CONSULTA,
  GET_CONSULTAS,
  UPDATE_CONSULTA,
  POST_CONSULTA,
  DELETE_CONSULTA,
  ERROR_CONSULTA,
  START_CONSULTA,
} from "./types";

// Obtener todas las consultas
export const getConsultas = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get(
      "http://3.143.242.114:3000/api/consultas",
      config
    );

    dispatch({
      type: GET_CONSULTAS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CONSULTA,
      payload: error.response?.data?.msg || "Error al obtener las consultas",
    });
  }
};

// Obtener una consulta específica por ID
export const getConsulta = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get(
      `http://3.143.242.114:3000/api/consultas/${id}`,
      config
    );

    dispatch({
      type: GET_CONSULTA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CONSULTA,
      payload: error.response?.data?.msg || "Error al obtener la consulta",
    });
  }
};

// Actualizar una consulta
export const updateConsulta = (id, formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.put(
      `http://3.143.242.114:3000/api/consultas/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_CONSULTA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CONSULTA,
      payload: error.response?.data?.msg || "Error al actualizar la consulta",
    });
  }
};

// Crear una nueva consulta
export const postConsulta = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: START_CONSULTA,
    });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.post(
      "http://3.143.242.114:3000/api/consultas",
      formData,
      config
    );

    console.log(res.data);

    dispatch({
      type: POST_CONSULTA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CONSULTA,
      payload: error.response?.data?.msg || "Error al crear la consulta",
    });
  }
};

// Eliminar una consulta
export const deleteConsulta = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    await axios.delete(`http://3.143.242.114:3000/api/consultas/${id}`, config);

    dispatch({
      type: DELETE_CONSULTA,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CONSULTA,
      payload: error.response?.data?.msg || "Error al eliminar la consulta",
    });
  }
};

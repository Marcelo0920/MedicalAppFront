import axios from "axios";

import {
  GET_DOCTOR,
  GET_DOCTORES,
  UPDATE_DOCTOR,
  POST_DOCTOR,
  DELETE_DOCTOR,
  ERROR_DOCTOR,
  DEFAULT_DOCTOR,
} from "./types";

export const getDoctores = () => async (dispatch) => {
  try {
    console.log("getting doctores");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get(
      "http://3.143.242.114:3000/api/medicos",
      config
    );

    console.log(res.data);

    dispatch({
      type: GET_DOCTORES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DOCTOR,
    });
  }
};

export const getDoctor = () => async (dispatch) => {
  try {
    console.log("getting one doctor");
    dispatch({
      type: GET_DOCTOR,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DOCTOR,
    });
  }
};

export const updateDoctor = (formData, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.put(
      `http://3.143.242.114:3000/api/medicos/${id}`,
      formData,
      config
    );

    console.log(res.data);

    dispatch({
      type: UPDATE_DOCTOR,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DOCTOR,
    });
  }
};

export const postDoctor = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.post(
      "http://3.143.242.114:3000/api/medicos",
      formData,
      config
    );

    dispatch({
      type: POST_DOCTOR,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DOCTOR,
    });
  }
};

export const deleteDoctor = () => async (dispatch) => {
  try {
    console.log("deleting doctor");
    dispatch({
      type: DELETE_DOCTOR,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DOCTOR,
    });
  }
};

export const defaultDoctor = () => async (dispatch) => {
  dispatch({
    type: DEFAULT_DOCTOR,
  });
};

import {
  GET_DIAGNOSTICO,
  GET_DIAGNOSTICOS,
  UPDATE_DIAGNOSTICO,
  POST_DIAGNOSTICO,
  DELETE_DIAGNOSTICO,
  ERROR_DIAGNOSTICO,
  START_DIAGNOSTICO,
} from "./types";

export const getDiagnosticos = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get(
      "http://3.143.242.114:3000/api/pacientes",
      config
    );

    dispatch({
      type: GET_DIAGNOSTICOS,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DIAGNOSTICO,
    });
  }
};

export const getDiagnostico = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get(
      "http://3.143.242.114:3000/api/pacientes",
      config
    );

    dispatch({
      type: GET_DIAGNOSTICO,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DIAGNOSTICO,
    });
  }
};

export const updateDiagnostico = () => async (dispatch) => {
  try {
    console.log("updating diagnostico");
    dispatch({
      type: UPDATE_DIAGNOSTICO,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DIAGNOSTICO,
    });
  }
};

export const postDiagnostico = (formData) => async (dispatch) => {
  try {
    console.log(formData);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    console.log("que pasa acaaaa");

    const res = await axios.post(
      "http://3.143.242.114:3000/api/diagnosticos-ia",
      config,
      formData
    );

    console.log(res.data);

    dispatch({
      type: POST_DIAGNOSTICO,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DIAGNOSTICO,
    });
  }
};

export const deleteDiagnostico = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
    };

    const res = await axios.get(
      "http://3.143.242.114:3000/api/pacientes",
      config
    );

    dispatch({
      type: DELETE_DIAGNOSTICO,
    });
  } catch (error) {
    dispatch({
      type: ERROR_DIAGNOSTICO,
    });
  }
};

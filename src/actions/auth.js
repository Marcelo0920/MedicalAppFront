import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT,
  LOGIN_START,
  LOGIN_DEFAULT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch({
        type: AUTH_ERROR,
      });
      return;
    }

    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(
      "http://3.143.242.114:3000/api/auth/renew",
      config
    );

    if (res.data.ok) {
      localStorage.setItem("token", res.data.token);

      setAuthToken(res.data.token);

      dispatch({
        type: USER_LOADED,
        payload: {
          token: res.data.token,
          user: res.data.usuario,
        },
      });
    }
  } catch (err) {
    console.error("Error al renovar token:", err);
    localStorage.removeItem("token");
    setAuthToken(null);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post(
      "http://3.143.242.114:3000/api/auth/login",
      body,
      config
    );

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);

      axios.defaults.headers.common["x-auth-token"] = res.data.token;

      console.log(res.data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          user: res.data.usuario,
          message: res.data.msg,
        },
      });

      /* dispatch(loadUser()); */
    }
  } catch (err) {
    const errorMessage = err.response?.data?.msg || "Error al iniciar sesión";

    console.error("Error en login:", err);

    dispatch({
      type: LOGIN_FAILED,
      payload: {
        msg: errorMessage,
        status: err.response?.status,
      },
    });

    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("token");
};

//login default
export const loginDefault = () => (dispatch) => {
  dispatch({
    type: LOGIN_DEFAULT,
  });
};

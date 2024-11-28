import {
  AUTH_ERROR,
  LOG_OUT,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGIN_DEFAULT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  usuario: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
  loginSuccess: false,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case USER_LOADED:
      console.log("User Loaded Payload:", payload); // Agregar este log
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        usuario: payload.user,
        token: payload.token,
        error: null,
      };

    case LOGIN_SUCCESS:
      console.log("Login Success Payload:", payload); // Agregar este log
      return {
        ...state,
        token: payload.token,
        usuario: payload.user,
        message: payload.msg,
        isAuthenticated: true,
        loginSuccess: true,
        loading: false,
        error: null,
      };

    case LOGIN_DEFAULT:
      return {
        ...state,
        error: null,
        loading: false,
        loginSuccess: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        usuario: null,
        error: "Error de autenticación",
        message: null,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        usuario: null,
        error: "Bad Login",
        message: null,
      };

    case LOG_OUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        usuario: null,
        error: null,
        message: "Sesión cerrada correctamente",
      };

    default:
      return state;
  }
}

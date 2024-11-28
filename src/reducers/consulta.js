// consultaReducer.js
import {
  GET_CONSULTA,
  GET_CONSULTAS,
  POST_CONSULTA,
  DELETE_CONSULTA,
  ERROR_CONSULTA,
  UPDATE_CONSULTA,
  START_CONSULTA,
} from "../actions/types";

const initialState = {
  consultas: [],
  consulta: null,
  loading: false,
  creationSuccess: false,
  msg: "",
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSULTAS:
      return {
        ...state,
        consultas: payload,
        loading: false,
      };

    case GET_CONSULTA:
      return {
        ...state,
        consulta: payload,
        loading: false,
      };

    case START_CONSULTA:
      return {
        ...state,
        loading: true,
        creationSuccess: false,
      };

    case POST_CONSULTA:
      return {
        ...state,
        consultas: [payload, ...state.consultas],
        creationSuccess: true,
        loading: false,
      };

    case DELETE_CONSULTA:
      return {
        ...state,
        consultas: state.consultas.filter(
          (consulta) => consulta.id !== payload
        ),
        loading: false,
      };

    case UPDATE_CONSULTA:
      return {
        ...state,
        loading: false,
        creationSuccess: true,
        msg: payload.msg,
        consultas: state.consultas.map((consulta) =>
          consulta.id === payload.consulta.id ? payload.consulta : consulta
        ),
      };

    case ERROR_CONSULTA:
      return {
        ...state,
        error: payload,
        loading: false,
        creationSuccess: false,
      };

    default: {
      return state;
    }
  }
}

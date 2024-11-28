import {
  GET_DOCTOR,
  GET_DOCTORES,
  POST_DOCTOR,
  DELETE_DOCTOR,
  ERROR_DOCTOR,
  UPDATE_DOCTOR,
  DEFAULT_DOCTOR,
} from "../actions/types";

const initialState = {
  doctores: [],
  doctor: null,
  loading: false,
  creationSuccess: false,
  msg: "",
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DOCTORES:
      return {
        ...state,
        doctores: payload,
        loading: false,
      };

    case DEFAULT_DOCTOR:
      return {
        ...state,
        creationSuccess: false,
        msg: "",
      };

    case GET_DOCTOR:
      return {
        ...state,
        doctor: payload,
        loading: false,
      };

    case POST_DOCTOR:
      return {
        ...state,
        doctores: [payload.medico, ...state.doctores],
        creationSuccess: true,
        loading: false,
      };

    case DELETE_DOCTOR:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_DOCTOR:
      return {
        ...state,
        loading: false,
        creationSuccess: true,
        msg: payload.msg,
        doctores: state.doctores.map((doctor) =>
          doctor.id == payload.medico.id ? payload.medico : doctor
        ),
      };

    case ERROR_DOCTOR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default: {
      return state;
    }
  }
}

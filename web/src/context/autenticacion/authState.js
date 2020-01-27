import React, { useReducer } from "react";

import api from "../../services/api";
import tokenAuth from "../../services/token";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "../../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async datos => {
    try {
      const { data } = await api.post(`/usuarios`, datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: data
      });

      usuarioAutenticado(); // Obtener usuario
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error"
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      });
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await api.get("/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR
      });
    }
  };

  const iniciarSesion = async datos => {
    try {
      const respuesta = await api.post("/auth", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });

      usuarioAutenticado(); // Obtener usuario
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error"
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;

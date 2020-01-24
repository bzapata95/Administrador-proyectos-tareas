import React, { useReducer } from "react";

import api from "../../services/api";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  // Obteneder los poyectos
  const obtenerProyectos = async () => {
    try {
      const { data } = await api.get();
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: data.proyectos
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  const agregarNuevoProyecto = async proyecto => {
    try {
      const resultado = await api.post("/proyectos", proyecto);

      // Insertar el proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data.proyecto
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  };

  // Selecciona el proyecto que el usuario dio click
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    });
  };

  // Elimina un proyecto
  const eliminarProyecto = async proyectoId => {
    try {
      await api.delete(`/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error"
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarNuevoProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;

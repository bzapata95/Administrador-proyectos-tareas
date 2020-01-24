import React, { useReducer } from "react";

import api from "../../services/api";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Obtener las tareas de un proyecto
  const obtenerTareas = async proyectoId => {
    try {
      const { data } = await api.get("tareas", {
        params: {
          proyecto: proyectoId
        }
      });

      dispatch({
        type: TAREAS_PROYECTO,
        payload: data.tareas
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Agragar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {
    try {
      await api.post("/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Valida y mustra un error en caso de que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await api.delete(`/tareas/${id}`, { params: { proyecto } });

      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Edita o modifica una tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await api.put(`/tareas/${tarea._id}`, tarea);

      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Extrae una tarea para edición
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  // Elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;

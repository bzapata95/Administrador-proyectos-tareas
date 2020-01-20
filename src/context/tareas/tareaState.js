import React, { useReducer } from "react";
import uuid from "uuid";

import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";

const TareaState = props => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
      { id: 2, nombre: "Elegir colores", estado: false, proyectoId: 2 },
      {
        id: 3,
        nombre: "Elegir plataformas de pago",
        estado: false,
        proyectoId: 2
      },
      { id: 4, nombre: "Elegir Hosting", estado: true, proyectoId: 2 }
    ],
    tareasproyecto: null,
    errortarea: false,
    tareaseleccionada: null
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Obtener las tareas de un proyecto
  const obtenerTareas = proyectoId => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    });
  };

  // Agragar una tarea al proyecto seleccionado
  const agregarTarea = tarea => {
    tarea.id = uuid.v4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    });
  };

  // Valida y mustra un error en caso de que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  const eliminarTarea = id => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    });
  };

  const cambiarEstadoTarea = tarea => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea
    });
  };

  // Extrae una tarea para edición
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  // Edita o modifica una tarea
  const actualizarTarea = tarea => {
    dispatch({
      type: ACTUALIZAR_TAREA,
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
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
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

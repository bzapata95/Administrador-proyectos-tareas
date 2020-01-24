import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
// import { Container } from './styles';

export default function Tarea({ tarea }) {
  const { proyecto } = useContext(proyectoContext);
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual
  } = useContext(tareaContext);

  // funcion que se ejecuta cuando el usuario preciona el btn de eliminar tarea
  const [proyectoActual] = proyecto;
  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  // FUNCION QUE MODIFICA EL ESTADO DE LAS TAREAS
  const cambiarestado = tarea => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  };
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarestado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarestado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

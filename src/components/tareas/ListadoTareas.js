import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

import Tarea from "../tareas/Tarea";

// import { Container } from './styles';

export default function ListadoTareas() {
  const { proyecto, eliminarProyecto } = useContext(proyectoContext);
  const { tareasproyecto } = useContext(tareaContext);

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  // Destructuring al array
  const [proyectoActual] = proyecto;

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareaas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">No hay tareas en este proyecto</li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition key={tarea.id} timeout={1000} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual.id)}
      >
        Eliminar proyecto &times;
      </button>
    </>
  );
}

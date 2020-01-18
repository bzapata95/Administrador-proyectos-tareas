import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import Tarea from "../tareas/Tarea";

// import { Container } from './styles';

export default function ListadoTareas() {
  const { proyecto, eliminarProyecto } = useContext(proyectoContext);

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  // Destructuring al array
  const [proyectoActual] = proyecto;

  const tareasProyecto = [
    { nombre: "Elegir plataforma", estado: true },
    { nombre: "Elegir colores", estado: false },
    { nombre: "Elegir plataformas de pago", estado: false },
    { nombre: "Elegir Hosting", estado: true }
  ];
  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareaas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">No hay tareas en este proyecto</li>
        ) : (
          tareasProyecto.map(tarea => <Tarea tarea={tarea} />)
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

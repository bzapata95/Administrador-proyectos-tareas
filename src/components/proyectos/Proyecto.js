import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
// import { Container } from './styles';

export default function Proyecto({ proyecto }) {
  const { proyectoActual } = useContext(proyectoContext);
  const { obtenerTareas } = useContext(tareaContext);

  // Función pra agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id); // Fijar un poryecto actual
    obtenerTareas(id); // Filtrar las tareas cuando se de click
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto.id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
}

import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
// import { Container } from './styles';

export default function Proyecto({ proyecto }) {
  const { proyectoActual } = useContext(proyectoContext);
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => proyectoActual(proyecto.id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
}

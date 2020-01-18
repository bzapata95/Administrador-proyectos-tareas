import React, { useContext, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

import Proyecto from "./Proyecto";

// import { Container } from './styles';

export default function ListadoProyectos() {
  const { proyectos, obtenerProyectos } = useContext(proyectoContext);

  useEffect(() => {
    obtenerProyectos();
  }, []);

  if (proyectos.length === 0) return <p>No hay proyectos...</p>;

  return (
    <ul className="listado-proyectos">
      {proyectos.map(proyecto => (
        <Proyecto key={proyecto.id} proyecto={proyecto} />
      ))}
    </ul>
  );
}

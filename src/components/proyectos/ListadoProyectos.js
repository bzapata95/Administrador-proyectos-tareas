import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContext";

import Proyecto from "./Proyecto";

// import { Container } from './styles';

export default function ListadoProyectos() {
  const { proyectos, obtenerProyectos } = useContext(proyectoContext);

  useEffect(() => {
    obtenerProyectos();

    // eslint-disable-next-line
  }, []);

  if (proyectos.length === 0) return <p>No hay proyectos...</p>;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition key={proyecto.id} timeout={500} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

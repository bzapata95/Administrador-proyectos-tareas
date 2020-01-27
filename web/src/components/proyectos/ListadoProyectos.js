import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertaContext from "../../context/alertas/alertaContext";

import Proyecto from "./Proyecto";

// import { Container } from './styles';

export default function ListadoProyectos() {
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { mensaje, proyectos, obtenerProyectos } = useContext(proyectoContext);

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();

    // eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0) return <p>No hay proyectos...</p>;

  return (
    <ul className="listado-proyectos">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition
            key={proyecto._id}
            timeout={1000}
            classNames="proyecto"
          >
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

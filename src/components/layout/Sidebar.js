import React from "react";

import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListadoProyectos from "../proyectos/ListadoProyectos";
// import { Container } from './styles';

export default function Sidebar() {
  return (
    <aside>
      <h1>
        MERN <span>Task</span>
      </h1>
      <NuevoProyecto />
      <div className="proyectos">
        <h2>Tus proyectos</h2>
        <ListadoProyectos />
      </div>
    </aside>
  );
}

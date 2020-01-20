import React from "react";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";

import Routes from "./routes";

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <Routes />
      </TareaState>
    </ProyectoState>
  );
}

export default App;

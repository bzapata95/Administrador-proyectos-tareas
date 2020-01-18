import React from "react";

import ProyectoState from "./context/proyectos/proyectoState";

import Routes from "./routes";

function App() {
  return (
    <ProyectoState>
      <Routes />
    </ProyectoState>
  );
}

export default App;

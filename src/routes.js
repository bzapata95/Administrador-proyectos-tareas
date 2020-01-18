import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
        <Route exact path="/proyectos" component={Proyectos} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

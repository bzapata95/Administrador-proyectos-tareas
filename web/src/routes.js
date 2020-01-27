import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import { isAuthenticated } from "./services/auth";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect
          to={{ pathname: "/proyectos", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/" component={Login} />
        <LoginRoute exact path="/nueva-cuenta" component={NuevaCuenta} />
        <PrivateRoute exact path="/proyectos" component={Proyectos} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

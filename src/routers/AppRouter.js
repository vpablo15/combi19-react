import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from "../pages/LoginScreen.js";
import { Dashboard } from "./Dashboard.js";
import { DashboardPasajero } from "./DashboardPasajero.js";

export const AppRouter = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/pasajero" component={DashboardPasajero} />
        </Switch>
      </div>
    </Router>
  );
};

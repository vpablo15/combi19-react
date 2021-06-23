import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ChoferesScreen } from "../pages/ChoferesScreen.js";
import { CombisScreen } from "../pages/CombisScreen.js";
import { InsumosScreen } from "../pages/InsumosScreen.js";
import { LoginScreen } from "../pages/LoginScreen.js";
import { LugaresScreen } from "../pages/LugaresScreen.js";
import { Navbar } from "../components/Navbar/Navbar.js";
import { RutasScreen } from "../pages/RutasScreen.js";
import { ViajesScreen } from "../pages/ViajesScreen.js";
export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/admin/choferes" component={ChoferesScreen} />
        <Route exact path="/admin/combis" component={CombisScreen} />
        <Route exact path="/admin/insumos" component={InsumosScreen} />
        <Route exact path="/admin/login" component={LoginScreen} />
        <Route exact path="/admin/lugares" component={LugaresScreen} />
        <Route exact path="/admin/rutas" component={RutasScreen} />
        <Route exact path="/admin/viajes" component={ViajesScreen} />
        <Redirect to="/admin/viajes" />
      </Switch>
    </>
  );
};

import React from "react";
import { Switch, Route } from "react-router-dom";//Redirec
import { HomeScreen } from "../pages/ScreensPasajero/HomeScreen";
import { ViajesScreen } from "../pages/ScreensPasajero/ViajesScreen";
import { ProfileScreen } from "../pages/ScreensPasajero/ProfileScreen";
import { NavbarPasajero } from "../components/Navbar/NavbarPasajero";
import { ComentarioScreen } from "../pages/ComentariosScreen";

export const DashboardPasajero = () => {
  return (
    <>
      <NavbarPasajero />
      <Switch>
        <Route exact path="/pasajero/home" component={HomeScreen} />
        <Route exact path="/pasajero/viajes" component={ViajesScreen} />
        <Route exact path="/pasajero/profile" component={ProfileScreen} />
        <Route exact path="/pasajero/comentarios" component={ComentarioScreen} />
        {/* <Redirect to="/home" /> */}
      </Switch>
    </>
  );
};
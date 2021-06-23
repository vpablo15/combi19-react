import React, { useState, useEffect } from "react";
import { FormLugar } from "../components/formLugar/FormLugar";
import {
  listarLugares,
  agregarLugar,
  borrarLugar,
  modificarLugar,
} from "../controllers/LugarABM";
import { listarRutas } from "../controllers/RutaABM";
import { LugaresDetails } from "./details/LugaresDetails";
import { validarLugar } from "./details/validarLugar";

export const LugaresScreen = () => {
  const [lugares, setLugares] = useState(["cargando"]);
  const [rutas, setRutas] = useState([]);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState({ visible: false, lugarId: "" });

  useEffect(() => {
    listarLugares().then((res) => setLugares(res));
    listarRutas().then((res) => setRutas(res));
  }, [state, state2, state3]);

  const refrescar = () => setState(!state);
  const showForm = () => setState2(!state2);
  const showDetails = (id) =>
    setState3({ visible: !state3.visible, lugarId: id });

  if (lugares[0] === "cargando") {
    return <div className="spinner"></div>;
  }

  if (lugares.length === 0) {
    return (
      <div>
        <h1>No hay lugares cargados</h1>
        <hr />
        {state2 ? (
          <FormLugar
            action={agregarLugar}
            callback={showForm}
            lugares={lugares}
          />
        ) : (
          <button onClick={showForm}>Agregar Lugar</button>
        )}
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Provincia</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lugares.map(({ id, nombre, provincia }) => {
            return state3.visible && state3.lugarId === id ? (
              <tr key={id}>
                <td></td>
                <td>
                  <LugaresDetails
                    id={id}
                    action={modificarLugar}
                    callback={showDetails}
                    initialState={{ nombre, provincia }}
                    lugares={lugares}
                    rutas={rutas}
                  />
                </td>
                <td></td>
              </tr>
            ) : (
              <tr key={id}>
                <td>{nombre}</td>
                <td>{provincia}</td>
                <td>
                  <button className="btnes" onClick={() => showDetails(id)}>
                    Modificar
                  </button>
                  <button
                    className="btnes"
                    onClick={() => {
                      if (window.confirm("Esta seguro que desea eliminar este lugar?")) {
                        if (validarLugar({nombre,provincia,id},rutas)) {
                          borrarLugar(id);
                        } else {
                          alert("No se puede eliminar, tiene al menos una ruta asignada");
                        }
                      refrescar();
                      }}
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      {state2 ? (
        <FormLugar
          action={agregarLugar}
          callback={showForm}
          lugares={lugares}
        />
      ) : (
        <button className="btnes" onClick={showForm}>
          Agregar Lugar
        </button>
      )}
    </div>
  );
};

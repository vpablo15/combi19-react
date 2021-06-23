import React, { useState, useEffect } from "react";
import { FormInsumo } from "../components/formInsumo/FormInsumo";
import {
  listarInsumos,
  agregarInsumo,
  modificarInsumo,
  borrarInsumo,
} from "../controllers/InsumoABM";
import { InsumosDetails } from "./details/InsumosDetails";
import "./styles/Insumos.css";


export const InsumosScreen = () => {
  const [insumos, setInsumos] = useState(["cargando"]);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState({ visible: false, lugarId: "" });

  const obtenerInsumos = () => {
    listarInsumos().then((res) => setInsumos(res));

  };

  useEffect(() => {
    obtenerInsumos();
  }, []);

  const refrescar = () => setState(!state);
  const showForm = () => setState2(!state2);
  const showDetails = (id) =>
    setState3({ visible: !state3.visible, insumoId: id });

  const confirmarEliminar = (id) => {
    if (window.confirm("Esta seguro que desea eliminar el insumo?")) {
      borrarInsumo(id);
      obtenerInsumos();
    }
  };

  if (insumos[0] === "cargando") {
    return <div className="spinner"></div>;
  }

  if (insumos.length === 0) {
    return (
      <div>
        <h1>No hay insumos cargados</h1>
        <hr />
        {state2 ? (
          <FormInsumo action={agregarInsumo} callback={showForm} />
        ) : (
          <button onClick={showForm}>Agregar Insumo</button>
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
            <th>Tipo</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {insumos.map(({ id, nombre, tipo, precio }) => {
            return state3.visible && state3.insumoId === id ? (
              <tr key={id}>
                <td></td>
                <td>
                  <InsumosDetails
                    id={id}
                    action={modificarInsumo}
                    callback={() => {
                      showDetails(id);
                      obtenerInsumos();
                    }}
                    initialState={{ nombre, tipo, precio }}
                    insumos={insumos}
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <tr key={id}>
                <td>{nombre}</td>
                <td>{tipo}</td>
                <td>${precio}</td>
                <td>
                  <button
                    className="btnes"
                    onClick={() => {
                      showDetails(id);
                    }}
                  >
                    Modificar
                  </button>
                  <button
                    className="btnes"
                    onClick={() => {
                      confirmarEliminar(id);
                      refrescar();
                    }}
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
        <FormInsumo
          action={agregarInsumo}
          callback={() => {
            showForm();
            obtenerInsumos();
          }}
          insumos={insumos}
        />
      ) : (
        <button className="btnes" onClick={showForm}>
          Agregar Insumo
        </button>
      )}
    </div>
  );
};

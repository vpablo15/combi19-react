import React, { useState, useEffect } from "react";
import { FormChofer } from "../components/formChofer/FormChofer.js";
import {
  agregarChofer,
  modificarChofer,
  borrarChofer,
  listarChoferes,
} from "../controllers/ChoferABM.js";
import { listarPasajeros } from "../controllers/PasajeroABM.js";
import { listarCombis } from "../controllers/CombiABM";
import { ChoferesDetails } from "./details/ChoferesDetails";
import { ChoferesDetalles } from "./details/ChoferesDetalles";
import { validarChofer } from "./details/ValidarChofer.js";

export const ChoferesScreen = ({ history }) => {
  const [choferes, setChoferes] = useState(["cargando"]);
  const [usuarios, setUsuarios] = useState([]);
  const [combis, setCombis] = useState([]);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState({ visible: false, choferId: "" });
  const [state4, setState4] = useState({ visible: false, chofer: {} });

  useEffect(() => {
    listarChoferes().then((res) => setChoferes(res));
    listarPasajeros().then((res) => setUsuarios(res));
    listarCombis().then((res) => setCombis(res));
    
  }, []);

  const refrescar = () => setState(!state);
  const showForm = () => setState2(!state2);
  const showDetails = (id) =>
    setState3({ visible: !state3.visible, choferId: id });
  const showMostrarDetalles = (
    nombre = "",
    apellido = "",
    mail = "",
    direccion = "",
    numeroDeContacto = ""
  ) => {
    setState4({
      visible: !state4.visible,
      chofer: { nombre, apellido, mail, direccion, numeroDeContacto },
    });
  };

  if (choferes[0] === "cargando") {
    return <div className="spinner"></div>;
  }

  if (state4.visible) {
    return (
      <ChoferesDetalles
        initialState={state4.chofer}
        callback={showMostrarDetalles}
      />
    );
  }

  if (choferes.length === 0) {
    return (
      <div>
        <h1>No hay choferes cargados</h1>
        <hr />
        {state2 ? (
          <FormChofer
            action={agregarChofer}
            callback={showForm}
            usuarios={[...usuarios, ...choferes, { mail: "combi19@admin.com" }]}
          />
        ) : (
          <button onClick={showForm}>Agregar Chofer</button>
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
            <th>Apellido</th>
            <th>Mail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {choferes.map(
            ({
              id,
              nombre,
              apellido,
              mail,
              direccion,
              numeroDeContacto,
              contraseña,
            }) => {
              return state3.visible && state3.choferId === id ? (
                <tr key={id}>
                  <td></td>
                  <td>
                    <ChoferesDetails
                      id={id}
                      action={modificarChofer}
                      callback={showDetails}
                      initialState={{
                        nombre,
                        apellido,
                        mail,
                        direccion,
                        numeroDeContacto,
                        contraseña,
                      }}
                      usuarios={[
                        ...usuarios,
                        ...choferes,
                        { mail: "combi19@admin.com" },
                      ]}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <tr key={id}>
                  <td onClick={() =>
                      showMostrarDetalles(
                        nombre,
                        apellido,
                        mail,
                        direccion,
                        numeroDeContacto
                      )
                    }>{nombre}</td>
                  <td onClick={() =>
                      showMostrarDetalles(
                        nombre,
                        apellido,
                        mail,
                        direccion,
                        numeroDeContacto
                      )
                    }>{apellido}</td>
                  <td onClick={() =>
                      showMostrarDetalles(
                        nombre,
                        apellido,
                        mail,
                        direccion,
                        numeroDeContacto
                      )
                    }>{mail}</td>
                  <td>
                    <button className="btnes" onClick={() => showDetails(id)}>Modificar</button>
                    <button
                      className="btnes"
                      onClick={() => {
                        if (window.confirm("Esta seguro que desea eliminar este chofer?")) {
                          const { isValid, msg } = validarChofer({id},combis)
                          if(isValid){
                            borrarChofer(id)
                          } else {
                            alert(msg);
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
            }
          )}
        </tbody>
      </table>
      <hr />
      {state2 ? (
        <FormChofer
          action={agregarChofer}
          callback={showForm}
          usuarios={[...usuarios, ...choferes, { mail: "combi19@admin.com" }]}
        />
      ) : (
        <button className="btnes" onClick={showForm}>Agregar Chofer</button>
      )}
    </div>
  );
};

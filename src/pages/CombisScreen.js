import React, { useState, useEffect } from "react";
import { FormCombi } from "../components/formCombi/FormCombi.js";
import { listarChoferes } from "../controllers/ChoferABM.js";
import { listarRutas } from "../controllers/RutaABM.js";
import { agregarCombi, modificarCombi, borrarCombi, listarCombis } from "../controllers/CombiABM.js";
import { CombisDetails } from "./details/CombisDetails";
import { CombisDetalles } from "./details/CombisDetalles";

export const CombisScreen = () => {
  const [combis, setCombis] = useState(["cargando"]);
  const [choferes, setChoferes] = useState([]);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState({ visible: false, combiId: "" });
  const [state4, setState4] = useState({ visible: false, combi: {} });
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    listarCombis().then((res) => setCombis(res));
    listarChoferes().then((res) => setChoferes(res));
    listarRutas().then((res) => setRutas(res));
  }, [state, combis]);

  const refreshView = (aShowAction) => {
    aShowAction();
    refrescar();
  };
  const refrescar = () => setState(!state);
  const showForm = () => setState2(!state2);
  const showDetails = (id) => setState3({ visible: !state3.visible, combiId: id });

  const showMostrarDetalles = (
    patente = "",
    modelo = "",
    chofer = {},
    cantidadDeAsientos = "",
    tipoDeCombi = ""
  ) => {
    setState4({
      visible: !state4.visible,
      combi: { patente, modelo, chofer, cantidadDeAsientos, tipoDeCombi },
    });
  };

  if (combis[0] === "cargando") {
    return <div className="spinner"></div>;
  }

  if (state4.visible) {
    return (
      <CombisDetalles
        initialState={state4.combi}
        callback={showMostrarDetalles}
      />
    );
  }

  if (combis.length === 0) {
    return (
      <div>
        <h1>No hay combis cargadas</h1>
        <hr />
        {state2 ? (
          <FormCombi
            action={agregarCombi}
            callback={() => refreshView(() => showForm())}
            choferes={choferes}
          />
        ) : (
          <button onClick={showForm}>Agregar Combi</button>
        )}
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Patente</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {combis.map(({ id, patente, modelo, chofer, cantidadDeAsientos, tipoDeCombi }) => {
               return state3.visible && state3.combiId === id ? (
                <tr key={id}>
                  <td></td>
                  <td>
                    <CombisDetails
                      id={id}
                      action={modificarCombi}
                      callback={() => refreshView(() => showDetails(id))}
                      initialState={{ patente, modelo, chofer, cantidadDeAsientos, tipoDeCombi }}
                      choferes={choferes}
                      combis={combis}
                      rutas={rutas}
                    />
                  </td>
                  <td></td>
                </tr>
              ) : (
                <tr key={id}>
                  <td onClick={() => showMostrarDetalles(patente, modelo, chofer, cantidadDeAsientos, tipoDeCombi)}>{patente}</td>
                  <td onClick={() => showMostrarDetalles(patente, modelo, chofer, cantidadDeAsientos, tipoDeCombi)}>{tipoDeCombi}</td>
                  <td>
                    <button className="btnes" onClick={() => showDetails(id)}>Modificar</button>
                    <button className="btnes" onClick={() => {
                      if (window.confirm("Esta seguro que desea eliminar esta combi?")) {
                        const rutaConCombi = rutas.filter(({ combi }) => combi.patente === patente);
                        if (rutaConCombi[0] != null) {
                          alert("no se puede eliminar, esta asignada al menos a una ruta");
                        } else {
                          borrarCombi(id);
                        }
                      }
                        refrescar();
                    }}>Eliminar</button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <hr />
      {state2 ? (
        <FormCombi
          action={agregarCombi}
          callback={showForm}
          choferes={choferes}
          combis={combis}
        />
      ) : (
        <button className="btnes" onClick={showForm}>Agregar Combi</button>
      )}
    </div>
  );
};

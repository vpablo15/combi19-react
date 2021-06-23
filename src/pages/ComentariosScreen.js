import React, { useState, useEffect } from "react";
import { FormComentario } from "../components/formComentario/FormComentario";
import { ComentariosDetails } from './details/ComentariosDetails'
import {
  listarComentariosPorId,
  agregarComentario,
  modificarComentario,
  borrarComentario,
} from "../controllers/ComentarioABM";

export const ComentarioScreen = () => {

  const user = JSON.parse(localStorage.getItem("user"))

  const [comentarios, setComentarios] = useState(["cargando"]);
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState({ visible: false, lugarId: "" });

  const buscarMisComentarios = (id) => {
    listarComentariosPorId(id).then((res) => setComentarios(res));
  };

  useEffect(() => {
    buscarMisComentarios(user.id);
  },);

  const refrescar = () => setState(!state);
  const showForm = () => setState2(!state2);
  const showDetails = (id) =>
    setState3({ visible: !state3.visible, insumoId: id });

  const confirmarEliminar = (id) => {
    if (window.confirm("¿Esta seguro que desea eliminar el comentario?")) {
      borrarComentario(id);
      refrescar()
    }
  };

  if (comentarios[0] === "cargando") {
    return <div className="spinner"></div>;
  }

  if (comentarios.length === 0) {
    return (
      <div>
        <h1>No hay comentarios cargados</h1>
        <hr />
        {state2 ? (
          <FormComentario action={agregarComentario} callback={showForm} />
        ) : (
          <button onClick={showForm}>Agregar Comentario</button>
        )}
      </div>
    );
  }

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Comentario</th>
            <th>Fecha y Hora</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {comentarios.map(({ id, comentario, fecha}) => {
            return state3.visible && state3.insumoId === id ? (
              <tr key={id}>
                <td></td>
                <td>
                  <ComentariosDetails
                    id={id}
                    action={modificarComentario}
                    callback={() => {
                      showDetails(id);
                    }}
                    initialState={{ comentario, fecha }}
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <tr key={id}>
                <td>{comentario}</td>
                <td>{new Date(fecha).toLocaleString()}</td>
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
                      confirmarEliminar(id,user.id);
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
      {/*state2 ? (
        <FormComentario
          action={agregarComentario}
          callback={() => {
            showForm();
            obtenerComentarios(id);
          }}
          comentarios={comentarios}
        />
      ) : (
        <button className="btnes" onClick={showForm}>
          Agregar C
        </button>
      )*/}
    </div>
  );
};

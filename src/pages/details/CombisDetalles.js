import React from "react";
import '../styles/styles.css';

export const CombisDetalles = ({
  initialState = {
    patente: "",
    modelo: "",
    chofer: {},
    cantidadDeAsientos: "",
    tipoDeCombi: "",
  },
  callback
}) => {

  return (
    <div className="detalles-style">
      <strong>Patente:</strong><p>{initialState.patente}</p><br/>
      <strong>Modelo:</strong><p>{initialState.modelo}</p><br/>
      <strong>chofer:</strong><p>{initialState.chofer.nombre}  {initialState.chofer.apellido}</p><br/>
      <strong>Asientos:</strong><p>{initialState.cantidadDeAsientos}</p><br/>
      <strong>Tipo de combi:</strong><p>{initialState.tipoDeCombi}</p><br/>
      <button onClick={callback}>Volver</button>
    </div>
  );
};

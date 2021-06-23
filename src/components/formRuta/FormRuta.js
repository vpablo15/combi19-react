import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const FormRuta = ({
  action,
  callback,
  initialState = {
    origen: {},
    destino: {},
    combi: {},
    horario: "",
    kilometros: "",
  },
  lugares,
  combis,
  rutas = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { origen, destino, combi, horario, kilometros } = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaRuta = {
      origen,
      destino,
      combi,
      horario,
      kilometros: Number(kilometros),
    };
    if (validarDatos(nuevaRuta)) {
      if (rutas[0] != null) {
        let rutaBuscada = rutas.filter(
          (ruta) =>
            ruta.origen.id === origen &&
            ruta.destino.id === destino &&
            ruta.horario === horario &&
            ruta.combi.id === combi
        );
        if (rutaBuscada[0] != null) {
          alert(
            "Ya se encuentra registrada una ruta con mismo origen, destino, combi y horario"
          );
        } else {
          if (origen === destino) {
            alert("Origen y destino no pueden ser iguales");
          } else {
            action(nuevaRuta).then((res) => console.log(res));
            alert("La operación se realizo con exito");
            callback();
          }
        }
      } else {
        if (origen === destino) {
          alert("Origen y destino no pueden ser iguales");
        } else {
          action(nuevaRuta).then((res) => console.log(res));
          alert("La operación se realizo con exito");
          callback();
        }
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const validarDatos = ({ origen, destino, combi, horario, kilometros }) => {
    if (
      origen === "" ||
      destino === "" ||
      combi === "" ||
      horario === "" ||
      (kilometros === "") || (origen === "Seleccione un origen") ||
      destino === "Seleccione un destino" ||
      combi === "Seleccione una combi" ||
      kilometros === 0 || kilometros.isNaN
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Formulario Nueva Ruta</h3>
        <select name="origen" value={origen} onChange={handleInputChange}>
          <option>Seleccione un origen</option>
          {lugares.map(({ id, nombre, provincia }) => {
            return (
              <option key={id} value={id}>
                {nombre},{provincia}
              </option>
            );
          })}
        </select>
        <br />
        <select name="destino" value={destino} onChange={handleInputChange}>
          <option selected>Seleccione un destino</option>
          {lugares.map(({ id, nombre, provincia }) => {
            return (
              <option key={id} value={id}>
                {nombre},{provincia}
              </option>
            );
          })}
        </select>
        <br />
        <select name="combi" value={combi} onChange={handleInputChange}>
          <option selected>Seleccione una combi</option>
          {combis.map(({ id, modelo, patente }) => {
            return (
              <option key={id} value={id}>
                {modelo},{patente}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="text"
          name="horario"
          placeholder="Ingrese un horario"
          autoComplete="off"
          value={horario}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="kilometros"
          placeholder="Ingrese cant de kilometros"
          autoComplete="off"
          value={kilometros}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const FormCombi = ({
  action,
  callback,
  initialState = {
    patente: "",
    modelo: "",
    chofer: "",
    cantidadDeAsientos: "",
    tipoDeCombi: "",
  },
  choferes,
  combis = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { patente, modelo, chofer, cantidadDeAsientos, tipoDeCombi } =
    formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCombi = {
      patente,
      modelo,
      chofer,
      cantidadDeAsientos: Number(cantidadDeAsientos),
      tipoDeCombi,
    };
    if (validarDatos(nuevaCombi)) {
      if (combis[0] != null) {
        let combiBuscada = combis.filter((combi) => combi.patente === patente);
        if (combiBuscada[0] != null) {
          alert("Ya se encuentra registrada una combi con esa patente");
        } else {
          action(nuevaCombi).then((res) => console.log(res));
          alert("La operación se realizo con exito");
          callback();
        }
      } else {
        action(nuevaCombi).then((res) => console.log(res));
        alert("La operación se realizo con exito");
        callback();
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const validarDatos = ({
    patente,
    modelo,
    chofer,
    cantidadDeAsientos,
    tipoDeCombi,
  }) => {
    if (
      patente === "" ||
      modelo === "" ||
      chofer === "" ||
      cantidadDeAsientos.isNaN ||
      tipoDeCombi === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Formulario Nueva Combi</h3>
        <input
          type="text"
          name="patente"
          placeholder="Ingrese la patente"
          autoComplete="off"
          value={patente}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="modelo"
          placeholder="Ingrese el modelo"
          autoComplete="off"
          value={modelo}
          onChange={handleInputChange}
        />
        <br />
        <select name="chofer" value={chofer} onChange={handleInputChange}>
          <option selected>Seleccione un chofer</option>
          {choferes.map(({ id, nombre, apellido }) => {
            return (
              <option key={id} value={id}>
                {nombre} {apellido}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="text"
          name="cantidadDeAsientos"
          placeholder="Ingrese una cantidad de asientos"
          autoComplete="off"
          value={cantidadDeAsientos}
          onChange={handleInputChange}
        />
        <br />
        <select
          name="tipoDeCombi"
          value={tipoDeCombi}
          onChange={handleInputChange}
        >
          <option selected>Seleccione el tipo de combi</option>
          <option value="Comoda">Comoda</option>
          <option value="Semi-comoda">Semi-Comoda</option>
        </select>
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const FormLugar = ({
  action,
  callback,
  initialState = {
    nombre: "",
    provincia: "",
  },
  lugares = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { nombre, provincia } = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoLugar = {
      nombre,
      provincia,
    };
    if (validarDatos(nuevoLugar)) {
      if (lugares[0] != null) {
        let lugarBuscado = lugares.filter(
          (lugar) => lugar.nombre === nombre && lugar.provincia === provincia
        );
        if (lugarBuscado[0] != null) {
          alert(
            "Ya se encuentra registrado un lugar con ese nombre y provincia"
          );
        } else {
          action(nuevoLugar).then((res) => console.log(res));
          alert("La operación se realizo con exito");
          callback();
        }
      } else {
        action(nuevoLugar).then((res) => console.log(res));
        alert("La operación se realizo con exito");
        callback();
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const validarDatos = ({ nombre, provincia }) => {
    if (nombre === "" || provincia === "") {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Formulario Nuevo Lugar</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese el nombre"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="provincia"
          placeholder="Ingrese la provincia"
          autoComplete="off"
          value={provincia}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

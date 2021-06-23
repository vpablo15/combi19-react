import React from "react";
import { useForm } from "../../hooks/useForm.js";
import { validarLugar } from "./validarLugar.js";

export const LugaresDetails = ({
  id,
  action,
  callback,
  initialState = {
    nombre: "",
    provincia: "",
  },
  lugares,
  rutas,
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
      const lugarBuscado = lugares.filter(
        (lugar) => lugar.nombre === nombre && lugar.provincia === provincia
      );
      if (lugarBuscado.length !== 0 && lugarBuscado[0].id !== id)
        alert("Ya se encuentra registrado un lugar con ese nombre y provincia");
      else if (validarLugar({ ...initialState, id: id }, rutas)) {
        action(id, nuevoLugar)
        alert("La operación se realizo con exito");
        callback();
      } else alert("No se puede actualizar los datos por estar el lugar asignado a una ruta");
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
        <h3>Informacion del lugar</h3>
        <label>Ciudad:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese el nombre"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <label>Provincia:</label>
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

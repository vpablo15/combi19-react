import React from "react";
import { useForm } from "../../hooks/useForm.js";
import "../formStyle.css";

export const FormInsumo = ({
  action,
  callback,
  initialState = {
    nombre: "",
    tipo: "",
    precio: "",
  },
  insumos = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { nombre, tipo, precio } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoInsumo = {
      nombre,
      tipo,
      precio: Number(precio),
    };
    if (validarDatos(nuevoInsumo)) {
      console.log("tiene", insumos);
      if (insumos[0] != null) {
        let insumoBuscado = insumos.filter(
          (insumo) => insumo.nombre === nombre
        );
        if (insumoBuscado[0] != null) {
          alert("Ya se encuentra registrado un insumo con ese nombre");
        } else {
          action(nuevoInsumo).then((res) => console.log(res));
          alert("La operación se realizo con exito");
          callback();
        }
      } else {
        action(nuevoInsumo).then((res) => console.log(res));
        alert("La operación se realizo con exito");
        callback();
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const validarDatos = ({ nombre, tipo, precio }) => {
    if (nombre === "" || tipo === "" || precio.isNaN) {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Formulario Nuevo Insumo</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese el nombre"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <select name="tipo" value={tipo} onChange={handleInputChange}>
          <option selected>Seleccione el tipo de insumo</option>
          <option value="Dulce">Dulce</option>
          <option value="Salado">Salado</option>
        </select>
        <br />
        <input
          type="text"
          name="precio"
          placeholder="Ingrese el precio"
          autoComplete="off"
          value={precio}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

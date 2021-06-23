import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const InsumosDetails = ({
  id,
  action,
  callback,
  initialState = {
    nombre: "",
    tipo: "",
    precio: "",
  },
  insumos
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
    console.log("datos", nuevoInsumo);
    if(validarDatos(nuevoInsumo)){
      let insumoBuscado = insumos.filter(insumo => insumo.nombre === nombre)
      if(insumoBuscado[0] != null && insumoBuscado[0].id !== id){
        alert("Ya se encuentra registrado un insumo con ese nombre")
      }else{
        action(id, nuevoInsumo).then((res) => console.log(res));
        alert("La operación se realizo con exito")
        callback();
      }
    }else{
      alert('Deben estar todos los campos rellenados')
    }
  };
  
  const validarDatos = ({ nombre, tipo, precio }) => {
    if (nombre === "" || tipo === "" || tipo === "Seleccione el tipo de insumo"|| precio.isNaN || precio === 0) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Informacion del Insumo</h3>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ingrese el nombre"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <label>Tipo:</label>
        <select name="tipo" value={tipo} onChange={handleInputChange}>
          <option>Seleccione el tipo de insumo</option>
          <option value="Dulce">Dulce</option>
          <option value="Salado">Salado</option>
        </select>
        <br />
        <label>Precio</label>
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
}

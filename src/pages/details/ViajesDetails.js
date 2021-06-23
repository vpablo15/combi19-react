import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ViajesDetails = ({
  id,
  action,
  callback,
  initialState = {
    ruta: {},
    cantidadAsientos: "",
    precio: "",
    estado:0
  },
  rutas,
  viajes = [],
}) => {
  const [formValues, handleInputChange] = useForm({
    ...initialState,
    ruta: initialState.ruta.id,
  });

  const { ruta, cantidadAsientos, precio } = formValues;
  const [fecha, setFecha] = useState(new Date(initialState.fecha));

  const handleInputChangeDate = (unaFecha) => {
    setFecha(unaFecha);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoViaje = {
      ruta,
      cantidadAsientos: Number(cantidadAsientos),
      fecha,
      precio: Number(precio),
    };
    if (validarDatos(nuevoViaje)) {
      const viajeBuscado = viajes.filter(
        (viaje) =>
          viaje.ruta.id === ruta &&
          new Date(viaje.fecha).toLocaleDateString() === fecha.toLocaleDateString()
      );
      if(viajeBuscado[0] != null){
        alert("Ya se encuentra un viaje con la misma ruta y fecha")
      }else{
        switch (initialState.estado) {
          case 0:
            if(initialState.asientosDisponibles === initialState.cantidadAsientos)
              operacionExitosa(id,nuevoViaje);
            else
              alert("No se puede modificar un viaje pendiente que tiene pasajes vendidos");
            break;
          case 1:
            alert("No se puede modificar un viaje activo")
          break;
          default:
            console.log("default")
            break;
        }
      }
      
    } else alert("Deben estar todos los campos rellenados");
  };

  const operacionExitosa = (id, nuevoViaje) => {
    console.log(nuevoViaje)
    action(id, nuevoViaje);
    alert("La operación se realizo con éxito");
    callback();
  };

  const validarDatos = ({ ruta, cantidadAsientos, fecha, precio }) => {
    if (
      ruta === "" ||
      cantidadAsientos === "" ||
      fecha === "" ||
      precio === "" || precio.isNaN || precio === 0 ||
      ruta === "Seleccione una ruta"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <form className="form-modificar" onSubmit={handleSubmit}>
        <h3>Informacion del viaje</h3>
        <label>Ruta:</label>
        <br/>
        <select name="ruta" value={ruta} onChange={handleInputChange}>
          <option>Seleccione una ruta</option>
          {rutas.map(({ id, origen, destino }) => {
            return (
              <option key={id} value={id}>
                {origen.nombre},{destino.nombre}
              </option>
            );
          })}
        </select>
        <br />
        <label>Cantidad de asientos:</label>
        <small> ({cantidadAsientos} Max)</small>
        <br/>
        <input
          type="text"
          name="cantidadAsientos"
          placeholder="Ingrese la cantidad de asientos"
          autoComplete="off"
          value={cantidadAsientos}
          onChange={handleInputChange}
        />
        <br />
        <label>Fecha:</label>
        <br/>
        <DatePicker
          selected={fecha}
          onChange={handleInputChangeDate}
          dateFormat="dd-MM-yyyy"
        />
        <br />
        <label>Precio:</label>
        <br/>
        <input
          type="text"
          name="precio"
          placeholder="Ingrese un precio"
          autoComplete="off"
          value={precio}
          onChange={handleInputChange}
        />
        <br />
        <button className="btnes" type="submit">Guardar</button>
        <button className="btnes" onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

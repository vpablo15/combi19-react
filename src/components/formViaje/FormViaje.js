import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormViaje = ({
  action,
  callback,
  initialState = {
    ruta: "",
    cantidadAsientos: "",
    precio: "",
  },
  rutas = [],
  viajes = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { ruta, cantidadAsientos, precio } = formValues;
  const [fecha, setFecha] = useState(new Date());
  // const [alertMsg, setAlertMsg] = useState("")
  let asientosMax = 0;
  console.log('viajes',viajes)
  console.log('rutas',rutas)


  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoViaje = {
      ruta,
      cantidadAsientos: Number(cantidadAsientos),
      fecha,
      precio: Number(precio),
      estado: 0,
      asientosDisponibles:Number(cantidadAsientos)
    };
    if (validarDatos(nuevoViaje)) {
      if (viajes[0] != null) {
        const viajeBuscado = viajes.filter(
          (viaje) =>
            viaje.ruta.id === ruta &&
            new Date(viaje.fecha).toLocaleDateString() ===
              fecha.toLocaleDateString()
        );
        if (viajeBuscado[0] != null)
          alert("Ya se encuentra registrado un viaje con la misma fecha y ruta")
        else {
          const { validate,msg } = validarDiaYHora(nuevoViaje)
          if(validate){
            Number(cantidadAsientos) <= asientosMax
            ? operacionExitosa(nuevoViaje)
            : alert("No se puede superar la cantidad de asientos que tiene la combi");
          }else
            alert(msg)
        }
      } else {
        Number(cantidadAsientos) <= asientosMax
          ? operacionExitosa(nuevoViaje)
          : alert(
              "No se puede superar la cantidad de asientos que tiene la combi"
            );
      }
    } else alert("Deben estar todos los campos rellenados");
  };

  const operacionExitosa = (unViaje) => {
    action(unViaje);
    alert("La operaci??n se realizo con exito");
    callback();
  };

  const obtenerAsientos = () => {
    const rutaBuscada = rutas.filter((each) => each.id === ruta);
    asientosMax = rutaBuscada[0].combi.cantidadDeAsientos;
    return asientosMax;
  };

  const handleInputChangeDate = (unaFecha) => {
    setFecha(unaFecha);
  };

  const validarDiaYHora = ({ ruta, cantidadAsientos, fecha, precio }) => {
    let msg = ''
    let validate = true

    const miRuta = rutas.filter(each => each.id === ruta)
    const viajesEnElMismoDia = viajes.filter(viaje => 
      viaje.ruta.combi.chofer === miRuta[0].combi.chofer && 
      new Date(viaje.fecha).toLocaleDateString() === fecha.toLocaleDateString())

    const horasNuevoViaje = miRuta[0].horario.split(" ")

    console.log('viajes mismo dia',viajesEnElMismoDia)
    console.log('mi ruta',miRuta)

    let i = 0
    while(viajesEnElMismoDia[i] !== null && msg === ''){

        console.log('Vuelta ' + i)
      
         const horas = viajesEnElMismoDia[i].ruta.horario.split(" ")
         if(!horasNuevoViaje[0] >= horas[0] && horasNuevoViaje[0] <= horas[2]){
          if(!horasNuevoViaje[2] >= horas[0] && horasNuevoViaje[2] <= horas[2]){
            if(horasNuevoViaje[2] <= horas[0]){
              if(!ruta.destino.id === viajesEnElMismoDia[i].ruta.origen.id){
                validate = false
                msg = 'Hay incongruencia en el origen o destino' 
              }
            }else{
              if(!ruta.origen.id === viajesEnElMismoDia[i].ruta.destino.id){
                validate = false
                msg = "Hay incongruencia en el origen o destino"
              }
            }
          }else{
            validate = false
            console.log('deberia entrar aca')
            msg = 'Existe un viaje con el mismo chofer o combi que coincide en fecha y rango horario'
          }
         }else{
          validate = false
          msg = 'Existe un viaje con el mismo chofer o combi que coincide en fecha y rango horario'
         }
    
      i++      

    }
    return { validate,msg }

  }

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
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Formulario Nuevo Viaje</h3>
        <select name="ruta" value={ruta} onChange={handleInputChange}>
          <option>Seleccione una ruta</option>
          {rutas.map(({ id, origen, destino, horario, combi }) => {
            return (
              <option key={id} value={id}>
                Origen:{origen.nombre}, Destino:{destino.nombre}, Horario:
                {horario}, Combi:{combi.patente}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="text"
          name="cantidadAsientos"
          placeholder="ingrese la cant de asientos"
          autoComplete="off"
          value={cantidadAsientos}
          onChange={handleInputChange}
        />
        <small>
          {ruta === ""
            ? "Ingrese una ruta primero"
            : `Cant Maxima de Asientos:${obtenerAsientos()}`}
        </small>
        <br />
        <DatePicker
          selected={fecha}
          onChange={handleInputChangeDate}
          dateFormat="dd-MM-yyyy"
        />
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
        <button className="form-simple-button" type="submit">Guardar</button>
        <button className="form-simple-button" onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

import React,{useState} from "react";
import { useForm } from "../../hooks/useForm.js";
import "../../components/formStyle.css"
import { validarCombi } from "./ValidarCombi.js";

export const CombisDetails = ({
  id,
  action,
  callback,
  initialState = {
    patente: "",
    modelo: "",
    chofer: {},
    cantidadDeAsientos: "",
    tipoDeCombi: "",
  },
  choferes,
  combis,
  rutas,
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { patente, modelo,cantidadDeAsientos, tipoDeCombi } =
    formValues;

  const [choferId,setChoferId] = useState(initialState.chofer.id);

  const handleChoferIdChange = ({target}) => {
    setChoferId(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCombi = {
      patente,
      modelo,
      chofer:choferId,
      cantidadDeAsientos: Number(cantidadDeAsientos),
      tipoDeCombi,
    };
    //faltaria ver que onda con viajes pendientes
    if (validarDatos(nuevaCombi)) {
      const combiBuscada = combis.filter((combi) => combi.patente === patente);
      if (combiBuscada.length !== 0 && combiBuscada[0].id !== id) {
        alert("Ya se encuentra una combi con la misma patente");
      } else if(validarCombi({ ...initialState, id: id }, rutas)){
         action(id, nuevaCombi);
         alert("La operación se realizo con éxito");
         //console.log(nuevaCombi);
         callback();
      } else { alert("La combi se encuentra asignada a una ruta") }
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
      tipoDeCombi === "" ||
      chofer === "Seleccione un chofer" ||
      tipoDeCombi === "Seleccione el tipo de combi"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h3>Informacion de la combi</h3>
      <label>Patente:</label>
      <input
        type="text"
        name="patente"
        placeholder="Ingrese la patente"
        autoComplete="off"
        value={patente}
        onChange={handleInputChange}
      />
      <br />
      <label>Modelo:</label>
      <input
        type="text"
        name="modelo"
        placeholder="Ingrese el modelo"
        autoComplete="off"
        value={modelo}
        onChange={handleInputChange}
      />
      <br />
      <label>Chofer:</label>
      <select name="choferId" value={choferId} onChange={handleChoferIdChange}>
        <option>Seleccione un chofer</option>
        {choferes.map(({ id, nombre, apellido }) => {
          return (
            <option key={id} value={id}>
              {nombre} {apellido}
            </option>
          );
        })}
      </select>
      <br />
      <label>Cant de Asientos:</label>
      <input
        type="text"
        name="cantidadDeAsientos"
        placeholder="Ingrese una cantidad de asientos"
        autoComplete="off"
        value={cantidadDeAsientos}
        onChange={handleInputChange}
      />
      <br />
      <label>Tipo de Combi:</label>
      <select
        name="tipoDeCombi"
        value={tipoDeCombi}
        onChange={handleInputChange}
      >
        <option>Seleccione el tipo de combi</option>
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

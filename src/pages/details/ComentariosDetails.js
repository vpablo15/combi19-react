import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const ComentariosDetails = ({
  id,
  action,
  callback,
  initialState = {
    pasajero: {},
    comentario: "",
    modificado: false,
  },

}) => {
  const [formValues, handleInputChange] = useForm(initialState);

  const { comentario } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoComentario = {
      comentario,
      modificado:true
    };
     if (comentario.length > 0) {
         operacionExitosa(id,nuevoComentario) 
     } else {
         alert("Deben estar todos los campos rellenados");  
        } 
     };

  const operacionExitosa = (id, nuevoComentario) => {
    action(id, nuevoComentario);
    alert("La operación se realizo con éxito");
    callback();
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Comentario</h3>
        <br/>
        <input
          type="text"
          name="comentario"
          placeholder="Ingrese un comentario"
          autoComplete="off"
          value={comentario}
          onChange={handleInputChange}
        />
        <br />
        <button className="btnes" type="submit">Guardar</button>
        <button className="btnes" onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

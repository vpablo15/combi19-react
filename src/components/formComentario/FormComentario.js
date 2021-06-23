import React from "react";
import { useForm } from "../../hooks/useForm.js";
import './formStyle.css'

export const FormComentario = ({
  action,
  callback,
  initialState = {
    comentario: ""
  },
  pasajeroId,
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { comentario } = formValues

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoComentario = {
      pasajero:pasajeroId,
      comentario,
      fecha: new Date(),
      modificado: false,
      };
      operacionExitosa(nuevoComentario);   
    };

    const operacionExitosa = (unComentario) => {
      action(unComentario);
      alert("La operación se realizo con exito");
      callback();
    };

    return (
      <div className="form-comentario">
        <form onSubmit={handleSubmit}>
          <h3>Formulario Nuevo Comentario</h3>
          <textarea
            type="text"
            name="comentario"
            placeholder="Ingrese su comentario"
            autoComplete="off"
            value={comentario}
            onChange={handleInputChange}
          />
          <br />
          {
            (comentario.length > 0) ? 
            <button type="submit">Guardar</button>
            :
            <button disabled="true" type="submit">Guardar</button>
          }
          <button onClick={callback}>Cancelar</button>
        </form>
      </div>
    );
};

import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const ChoferesDetails = ({
  id,
  action,
  callback,
  initialState = {
    nombre: "",
    apellido: "",
    mail: "",
    direccion: "",
    numeroDeContacto: "",
    contraseña: "",
  },
  usuarios = []
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const {
    nombre,
    apellido,
    mail,
    direccion,
    numeroDeContacto,
    contraseña,
  } = formValues;
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoChofer = {
      nombre,
      apellido,
      mail,
      direccion,
      numeroDeContacto,
      contraseña,
    };
    if (validarDatos(nuevoChofer)) {
      console.log(usuarios)
      if(usuarios[0] != null){
        //const yoMismo = usuarios.filter((usuario) => usuario.mail === initialState.mail);
        const usuarioBuscado = usuarios.filter((usuario) => usuario.mail === mail);
        if (usuarioBuscado[0] != null && usuarioBuscado[0].id !== id){
          alert("Ya se encuentra registrado un usuario con ese mail");
        }else{
          if (contraseña.length > 5){
            operacionExitosa(id,nuevoChofer)
          }else{
            alert("La contraseña debe tener al menos 6 caracteres")
          }
        }
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

  const operacionExitosa = (id,nuevoChofer) => {
      action(id,nuevoChofer);
      alert("La operación se realizo con exito");
      callback();
  }

  const validarDatos = ({
    nombre,
    apellido,
    mail,
    direccion,
    numeroDeContacto,
    contraseña,
  }) => {
    if (
      nombre === "" ||
      apellido === "" ||
      mail === "" ||
      direccion === "" ||
      numeroDeContacto.isNaN ||
      contraseña === ""
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Informacion del chofer</h3>
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
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          placeholder="Ingrese la apellido"
          autoComplete="off"
          value={apellido}
          onChange={handleInputChange}
        />
        <br />
        <label>Mail:</label>
        <input
          type="text"
          name="mail"
          placeholder="Ingrese el mail"
          autoComplete="off"
          value={mail}
          onChange={handleInputChange}
        />
        <br />
        <label>Direccion:</label>
        <input
          type="text"
          name="direccion"
          placeholder="Ingrese la direccion"
          autoComplete="off"
          value={direccion}
          onChange={handleInputChange}
        />
        <br />
        <label>Numero de Contacto:</label>
        <input
          type="text"
          name="numeroDeContacto"
          placeholder="Ingrese el numero de contacto"
          autoComplete="off"
          value={numeroDeContacto}
          onChange={handleInputChange}
        />
        <br />
        <label>Contraseña:</label>
        <input
          type="text"
          name="contraseña"
          placeholder="Ingrese la contraseña"
          autoComplete="off"
          value={contraseña}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
    </div>
  );
};

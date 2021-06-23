import React from "react";
import { useForm } from "../../hooks/useForm.js";

export const FormChofer = ({
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
  usuarios = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const { nombre, apellido, mail, direccion, numeroDeContacto, contraseña } =
    formValues;
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
      console.log(usuarios);
      if (usuarios[0] != null) {
        let usuarioBuscado = usuarios.filter(
          (usuario) => usuario.mail === mail
        );
        if (usuarioBuscado[0] != null) {
          alert("Ya se encuentra registrado un usuario con ese mail");
        } else {
          if (contraseña.length > 5) {
            action(nuevoChofer).then((res) => console.log(res));
            alert("La operación se realizo con exito");
            callback();
          } else {
            alert("La contraseña debe tener al menos 6 caracteres");
          }
        }
      } else {
        action(nuevoChofer).then((res) => console.log(res));
        alert("La operación se realizo con exito");
        callback();
      }
    } else {
      alert("Deben estar todos los campos rellenados");
    }
  };

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
        <h3>Formulario Nuevo Chofer</h3>
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
          name="apellido"
          placeholder="Ingrese la apellido"
          autoComplete="off"
          value={apellido}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="mail"
          placeholder="Ingrese el mail"
          autoComplete="off"
          value={mail}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="direccion"
          placeholder="Ingrese la direccion"
          autoComplete="off"
          value={direccion}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="numeroDeContacto"
          placeholder="Ingrese el numero de contacto"
          autoComplete="off"
          value={numeroDeContacto}
          onChange={handleInputChange}
        />
        <br />
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

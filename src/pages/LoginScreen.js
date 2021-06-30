import React, { useState, useEffect } from "react";//useContext
//import { UserContext } from "../context/UserContext";
import { useForm } from "../hooks/useForm.js";
import { FormPasajero } from "../components/formPasajero/FormPasajero.js";
import {
  agregarPasajero,
  listarPasajeros,
} from "../controllers/PasajeroABM.js";
import { listarChoferes } from "../controllers/ChoferABM.js";
import "./styles/login.css"

export const LoginScreen = ({ history }) => {
  const [pasajeros, setPasajeros] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [formValues, handleInputChange] = useForm({
    correo: "",
    contraseña: "",
  });

  const { correo, contraseña } = formValues;

  let usuarioEncontrado = {}
  
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    listarPasajeros().then((res) => setPasajeros(res));
    listarChoferes().then((res) => setChoferes(res));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      correo,
      contraseña,
      tipo:""
    };
    console.log('user',user)
    if (correo === "" || contraseña === "") {
      alert("Los campos no deben estar vacios");
    } else {
      if (existeUsuario(user)) {
        if (user.tipo === "administrador") {
          localStorage.clear()
          localStorage.setItem("user",JSON.stringify(usuarioEncontrado))
          history.replace("/admin/viajes");
        } else if (user.tipo === "chofer") {
          localStorage.clear()
          localStorage.setItem("user",JSON.stringify(usuarioEncontrado))
          history.replace("/chofer/viajes");
        } else {
          localStorage.clear()
          localStorage.setItem("user",JSON.stringify(usuarioEncontrado))
          history.replace("/pasajero/home");
        }
      } else {
        alert("Usuario y/o contraseña son incorrectos");
      }
    }
  };

  const existeUsuario = (user) => {
    const usuarioBuscado1 = pasajeros.filter(
      (pasajero) =>
        pasajero.mail === user.correo && pasajero.contraseña === user.contraseña
    );
    const usuarioBuscado2 = choferes.filter(
      (chofer) =>
        chofer.mail === user.correo && chofer.contraseña === user.contraseña
    );
    if (
      usuarioBuscado1[0] != null ||
      usuarioBuscado2[0] != null ||
      user.correo === "combi19@hotmail.com"
    ) {
      if (usuarioBuscado1[0] != null){
        user.tipo = "pasajero";
        usuarioEncontrado = usuarioBuscado1[0]
      }else 
        if (usuarioBuscado2[0] != null){
          user.tipo = "chofer";
          usuarioEncontrado = usuarioBuscado2[0]
        }
        else {
          user.tipo = "administrador";
          usuarioEncontrado = {
            corre:"combi19@hotmail.com",
            contraseña:"123"
          }
        }
      return true;
    }
    return false;
  };

  return (
    <div>
      {
        (!showForm) ?
        <form className="form-login" onSubmit={handleSubmit}>
        <h3>Inciar Sesion</h3>
        <input
          type="text"
          name="correo"
          placeholder="Ingrese su correo electronico"
          autoComplete="off"
          value={correo}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          name="contraseña"
          placeholder="Ingrese su contraseña"
          autoComplete="off"
          value={contraseña}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Ingresar</button>
        <p>Aun no tienes una cuenta, <strong onClick={() => setShowForm(!showForm)}>registrate aca</strong></p>
      </form>
      :
        <FormPasajero
          history={history}
          action={agregarPasajero}
          callback={() => setShowForm(!showForm)}
          pasajeros={pasajeros}
          choferes={choferes}
        />
      }
    </div>
  );
};

import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../formStyle.css'
//Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export const FormPasajero = ({
  history,
  action,
  callback,
  initialState = {
    nombre: "",
    apellido: "",
    dni: "",
    mail: "",
    contraseña: "",
    numero:"",
    titular:"",
    codSeguridad:""
  },
  pasajeros = [],
  choferes = [],
}) => {
  const [formValues, handleInputChange] = useForm(initialState);
  const [fechaDeNacimiento, setFecha] = useState(new Date());
  const [fechaVencimiento, setFechaVencimiento] = useState(new Date());
  const [showFormPlanGold, setShowFormPlanGold] = useState(false)

  
  const { nombre, apellido, dni, mail, contraseña, numero,titular,codSeguridad} = formValues; //plan

  //Manejador Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [alertMsg, setAlertMsg] = useState("")

  const calcularEdad = (fecha) => {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nuevoPasajero = {
      nombre,
      apellido,
      dni: Number(dni),
      mail,
      contraseña,
      fechaDeNacimiento,
      plan:false
    };

    if (validarDatos(nuevoPasajero)) {
      const { validate, mensage } = validarMail(nuevoPasajero);
      //Validate devuelve true si el mail no es valido
      if (validate) {
        setAlertMsg(mensage);
        handleClickOpen();
      } else {
        const { valido, msg } = validarContraseñaYEdad(nuevoPasajero);
        if (!valido) {
          setAlertMsg(msg)
          handleClickOpen()
        } else {
          if(showFormPlanGold){
            nuevoPasajero = {
              ...nuevoPasajero,
              tarjeta:{
                numero: Number(numero),
                titular,
                vencimiento:fechaVencimiento,
                codigo:Number(codSeguridad)
              }
            }
            const { valido,msg } = validarTarjeta(nuevoPasajero.tarjeta)
            if(valido){ 
              action({...nuevoPasajero,plan:true});
              agregarCertificacion({...nuevoPasajero,plan:true})
              history.replace("/pasajero/home")
            }else{
              setAlertMsg(msg)
              handleClickOpen()
            }
          }else{
            action({...nuevoPasajero,tarjeta:{}});
            agregarCertificacion(nuevoPasajero) //Podria agregar un efecto para cuando ingresa a la app
            history.replace("/pasajero/home")
          }         
        }
      }
    } else {
      setAlertMsg("Deben estar todos los campos rellenados")
      handleClickOpen()
    }
  };

  const agregarCertificacion = (user) => {
    localStorage.setItem("user",JSON.stringify(user))
  }

  const validarDatos = ({ nombre, apellido, dni, mail, contraseña, plan }) => {
    if (
      nombre === "" ||
      apellido === "" ||
      dni.isNaN || dni === "" || dni === 0 ||
      mail === "" ||
      contraseña === "" ||
      plan === "Seleccione el tipo de plan"
    ) {
      return false;
    }
    return true;
  };

  const validarTarjeta = ({numero,titular,vencimiento,codigo}) => {
    if(numero === "" || titular === "" || codigo === "" || codigo === 0){
      return {valido:false,msg:"Deben estar todos los campos completados"}
    }
    if(numero.length > 15){
      return {valido:false,msg:"El numero de la tarjeta debe tener 16 digitos"}
    }
    if(codigo.length > 3 && codigo.length < 5){
      return {valido:false,msg:"El código de seguridad es incorrecto"}
    }
    if(vencimiento < new Date()){
      return {valido:false,msg:"La fecha de vencimiento es invalida"}
    }
    return {valido:true,msg:"Se registro la cuenta correctamente"}
  }

  const validarMail = ({ mail }) => {
    let pasajeroBuscado = [];
    let choferBuscado = [];
    if (pasajeros[0] != null) {
      pasajeroBuscado = pasajeros.filter((pasajero) => pasajero.mail === mail);
    }
    if (choferes[0] != null) {
      choferBuscado = choferes.filter((chofer) => chofer.mail === mail);
    }
    if (
      pasajeroBuscado[0] != null ||
      choferBuscado[0] != null ||
      mail === "combi19@hotmail.com"
    ) {
      return {validate:true,mensage:"Ya se encuentra un usuario registrado con ese correo"};
    }
    return {validate:false,mensage:""};
  };

  const validarContraseñaYEdad = (usuario) => {
    if (usuario.contraseña.length < 6) {
      return {
        valido: false,
        msg: "La contraseña debe tener al menos 6 caracteres",
      };
    }
    const edad = calcularEdad(usuario.fechaDeNacimiento);
    
    if (edad < 18) {
      return { valido: false, msg: "Debe ser mayor de 18 años" };
    }
    return { valido: true, msg: "La operacion se realizo con exito" };
  };

  const handleInputChangeDate = (fechaDeNacimiento) => {
    setFecha(fechaDeNacimiento);
  };

  const handleInputChangeDate2 = (fechaDeVenci) => {
    setFechaVencimiento(fechaDeVenci);
  };

  return (
    <div className="form-simple">
      <form onSubmit={handleSubmit}>
        <h3>Registrarte</h3>
        <label>Nombre</label>
        <br/>
        <input
          type="text"
          name="nombre"
          placeholder="Maria Jose"
          autoComplete="off"
          value={nombre}
          onChange={handleInputChange}
        />
        <br />
        <label>Apellido</label>
        <br />      
        <input
          type="text"
          name="apellido"
          placeholder="Perez"
          autoComplete="off"
          value={apellido}
          onChange={handleInputChange}
        />
        <br />
        <label>DNI</label>
        <br/>
        <input
          type="text"
          name="dni"
          placeholder="17075478"
          autoComplete="off"
          value={dni}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label>Correo electronico</label>
        <br /> 
        <input
          type="text"
          name="mail"
          placeholder="MJose@gmail.com"
          autoComplete="off"
          value={mail}
          onChange={handleInputChange}
        />
        <br />
        <label>Contraseña</label>
        <br/>
        <input
          type="password"
          name="contraseña"
          placeholder="Debe tener al menos 6 digitos"
          autoComplete="off"
          value={contraseña}
          onChange={handleInputChange}
        />
        <br />
        <label>F. de Nacimiento</label>
        <br/>
        <DatePicker
          selected={fechaDeNacimiento}
          onChange={handleInputChangeDate}
          dateFormat="dd-MM-yyyy"
        />
        <br />
        {
          (!showFormPlanGold) ? 
            <p onClick={() => setShowFormPlanGold(!showFormPlanGold)}>Suscribirse Plan Gold</p>
          :
          <div className="form-tarjeta">
            <h3>Datos de la tarjeta</h3>
            <br/>
            <label>Numero</label>
            <br/>
            <input 
               type="text"
               name="numero"
               placeholder="0000-0000-0000-0000"
               autoComplete="off"
               value={numero}
               onChange={handleInputChange}
               />
            <br/>
            <label>Titular</label>
            <br/>
            <input
              type="text"
              name="titular"
              placeholder="Titular de la tarjeta"
              autoComplete="off"
              value={titular}
              onChange={handleInputChange}
            />
            <br/>
            <label>F. de Vencimiento</label>
            <br/>
            <DatePicker 
              selected={fechaVencimiento}
              onChange={handleInputChangeDate2}
              dateFormat="dd-MM-yyyy"
              />
            <br/>
            <label>Cod. de Seguridad</label>
            <br/>
            <input
                type="text"
                name="codSeguridad"
                placeholder="Codigo de 3 digitos"
                autoComplete="off"
                value={codSeguridad}
                onChange={handleInputChange}
            />
            <p onClick={() => setShowFormPlanGold(!showFormPlanGold)}>Cancelar Suscripcion</p>
          </div>
        }
        <br/>
        <button type="submit">Guardar</button>
        <button onClick={callback}>Cancelar</button>
      </form>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {alertMsg}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

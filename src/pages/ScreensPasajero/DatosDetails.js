import React,{useEffect, useState} from 'react'
import { useForm } from '../../hooks/useForm'
import DatePicker from "react-datepicker";
import { listarPasajeros, modificarPasajero } from '../../controllers/PasajeroABM';
import { listarChoferes } from '../../controllers/ChoferABM';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export const DatosDetails = ({ user }) => {
    
    //Manejador Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [alertMsg, setAlertMsg] = useState("")

    const [pasajeros, setpasajeros] = useState([])
    const [choferes, setchoferes] = useState([])

    useEffect(() => {
        listarPasajeros().then(res => setpasajeros(res))
        listarChoferes().then(res => setchoferes(res))
    }, [])

    const [ values,handleInputChange ] = useForm(user)

    const { nombre,apellido,dni,fechaDeNacimiento,mail,contraseña } = values

    const [fecha, setFecha] = useState(new Date(fechaDeNacimiento));

    const [botonGuardar, setBotonGuardar] = useState(false)

    const handleInputChangeDate = (unaFecha) => {
        setFecha(unaFecha);
        setBotonGuardar(true)
    };


    const inputSubmit = e => {
        e.preventDefault()
        const usuarioActualizado = {
            nombre,
            apellido,
            dni,
            fechaDeNacimiento:fecha,
            mail,
            contraseña
        }
        if(validarDatos(usuarioActualizado)){
            const { validate, mensage } = validarMail(usuarioActualizado);
            if(validate){
                setAlertMsg(mensage);
                handleClickOpen()
            }else{
                const { valido, msg } = validarContraseñaYEdad (usuarioActualizado);
                if(!valido){
                    setAlertMsg(msg);
                    handleClickOpen();
                }else{
                    modificarPasajero(user.id,usuarioActualizado)
                    actualizarLS(usuarioActualizado)
                    setAlertMsg(msg);
                    handleClickOpen()
                }
            }
        }else{
            setAlertMsg("Los campos deben estar rellenados")
            handleClickOpen()
        }
        console.log(usuarioActualizado)
    }
    
    const actualizarLS = ({nombre,apellido,mail,dni,contraseña,fechaDeNacimiento}) => {
        localStorage.setItem('user',JSON.stringify({
                ...user,
                nombre,
                apellido,
                mail,
                dni,
                contraseña,
                fechaDeNacimiento
            })
        )
    } 

    const validarDatos = ({ nombre, apellido, dni, mail, contraseña }) => {
        if (
          nombre === "" ||
          apellido === "" ||
          dni.isNaN || dni === "" || dni === 0 ||
          mail === "" ||
          contraseña === ""
        ) {
          return false;
        }
        return true;
    };
    
    const validarMail = ({ mail }) => {
        let pasajeroBuscado = [];
        let choferBuscado = [];
        if (pasajeros[0] != null) {
          pasajeroBuscado = pasajeros.filter((pasajero) => pasajero.mail === mail && pasajero.mail !== user.mail);
        }
        if (choferes[0] != null) {
          choferBuscado = choferes.filter((chofer) => chofer.mail === mail && chofer.mail !== user.mail);
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

    const validarContraseñaYEdad = (usuario) => {
        if (usuario.contraseña.length < 6) {
          return {
            valido: false,
            msg: "La contraseña debe tener al menos 6 caracteres",
          };
        }
        const edad = calcularEdad(usuario.fechaDeNacimiento);
        console.log("fecha", usuario.fechaDeNacimiento)
        console.log("edad:", edad);
        if (edad < 18) {
          return { valido: false, msg: "Debe ser mayor de 18 años" };
        }
        return { valido: true, msg: "La operacion se realizo con exito" };
    };

    return (
        <form onSubmit={inputSubmit}>
            <label>Nombre:</label>
            <br/>
            <input 
                name="nombre"
                value={nombre}
                onChange={(e) => {handleInputChange(e);setBotonGuardar(true)}}/>
            <br/>
            <label>Apellido:</label>
            <br/>
            <input 
                name="apellido"
                value={apellido}
                onChange={(e) => {handleInputChange(e);setBotonGuardar(true)}}/>
            <br/>
            <label>DNI:</label>
            <br/>
            <input 
                name="dni"
                value={dni}
                onChange={(e) => {handleInputChange(e);setBotonGuardar(true)}}/>
            <br/>
            <label>Fecha de Nacimiento:</label>
            <br/>
            <DatePicker
                   selected={fecha}
                   onChange={handleInputChangeDate}
                   dateFormat="dd-MM-yyyy"
                />
            <br/>
            <label>Mail:</label>
            <br/>
            <input 
                name="mail"
                value={mail}
                onChange={(e) => {handleInputChange(e);setBotonGuardar(true)}}/>
            <br/>
            <label>Contraseña:</label>
            <br/>
            <input 
                name="contraseña"
                value={contraseña}
                onChange={(e) => {handleInputChange(e);setBotonGuardar(true)}}
                // type="password"
                />
            <br/>
            <br/>
            {
                (botonGuardar) && <button type="submit">Guardar</button>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
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
        </form>
    )
}

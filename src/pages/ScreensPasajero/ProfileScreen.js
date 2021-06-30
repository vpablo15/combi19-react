import React, { useEffect } from 'react'
import { useState } from 'react'
import { FormTarjeta } from '../../components/formPasajero/FormTarjeta'
import { modificarPasajero } from '../../controllers/PasajeroABM'
import { modificarTarjeta } from '../../controllers/TarjetaABM'
import { buscarViajePasajeroPorId } from '../../controllers/ViajesPasajerosABM'
import { DatosDetails } from './DatosDetails'
import './profile.css'
//Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export const ProfileScreen = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    //Manejador Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleCloseConfirm = () => {
        modificarPasajero(user.id,{tarjeta:null,plan:false}).then( console.log )
        localStorage.setItem('user',JSON.stringify({
            ...user,
            tarjeta:null,
            plan:false
        }))
        window.location.reload()
    }
    const handleCloseCancel = () => {
        setOpen(false)
    }

    const [alertMsg, setAlertMsg] = useState("")

    const [tipo, setTipo] = useState("")

    const [mostrarFormTarjeta, setMostrarFormTarjeta] = useState(false)

    const handleTipo = ({target}) => {
        setTipo(target.value)
        switch (target.value) {
            case "pendientes":
                    setViajesMostrados(pendientes)
                break;
            case "pasados":
                    setViajesMostrados(pasados)
                break;
            case "cancelados":
                    setViajesMostrados(cancelados)
                break;
            default:
                    setViajesMostrados([])
                break;
        }
    }

    const traerMisViajes = () => {
        buscarViajePasajeroPorId(user.id).then(res => {
            const pend = res.filter(each => each.idViaje.estado === 0 && each.cancelado === false)
            const pasad = res.filter(each => each.idViaje.estado === 2 && each.cancelado === false)
            const cancel = res.filter(each => each.cancelado === true)
            setpendientes(pend)
            setpasados(pasad)
            setcancelados(cancel)
        })
    }

    const [pendientes, setpendientes] = useState([])
    const [pasados, setpasados] = useState([])
    const [cancelados, setcancelados] = useState([])

    useEffect(() => {
        traerMisViajes()
    },[])

    const [viajesMostrados, setViajesMostrados] = useState([])

    const cancelarSuscripcion = () => {
        setAlertMsg('¿Esta seguro que desea cancelar su suscripcion gold?')
        handleClickOpen()
    }

    return (
        <div>
            <br/>
            <div className="profile-screen">
                <div className="perfil-user">
                    <div id="perfil-image"></div>
                    <h1>Perfil</h1>          
                </div>
                <div className="datos-user">
                    <h2>Datos de usuario</h2>
                    <DatosDetails user={user}/>
                </div>
                <div className="premium-user">
                    <h2>Tipo de cuenta</h2>
                    {
                        (user.plan) ? (
                          <>
                            <h4>Usuario Gold</h4>
                            <p onClick={() => setMostrarFormTarjeta(true)}>Modificar tarjeta</p>
                            <p onClick={cancelarSuscripcion}>Cancelar suscripcion</p>
                          </>
                        ):(
                            <>
                                <h4>Usuario Básico</h4>
                                <p>Pasate a Gold y accede de forma mensual a nuestros increibles descuentos</p>
                                <h5 onClick={() => setMostrarFormTarjeta(true)}>Pasarse a Gold</h5> 
                            </>
                        )
                    }  
                </div>
                {
                    (mostrarFormTarjeta && !user.plan)?(
                        <div className="datos-user">
                        <FormTarjeta 
                            id={user.id}
                            action={modificarPasajero}
                            callback={() => setMostrarFormTarjeta(false)} 
                            msg={"Ingrese los datos de su tarjeta"}/>
                        </div>
                    ): (mostrarFormTarjeta && user.plan)?(
                        <div className="datos-user">
                        <FormTarjeta 
                            id={user.id}
                            action={modificarTarjeta}
                            callback={() => setMostrarFormTarjeta(false)} 
                            initialState={user.tarjeta}
                            msg={"Datos de su tarjeta"}/>
                        </div>
                    ):(
                        <></>
                    )
                }
            </div>
            <div className="historial-user">
                <br/>
                <hr/>
                <h2>Mis viajes</h2>
                <hr/>
                <div className="opciones">
                    <select name="tipo" value={tipo} onChange={handleTipo}>
                        <option selected>Seleccione tipo de viaje</option>
                        <option value="pendientes">Pendientes</option>
                        <option value="pasados">Pasados</option>
                        <option value="cancelados">Cancelados</option>
                    </select>
                </div>
                {
                    (viajesMostrados.length > 0) ? (
                        <ul className="viajes-list">
                            {
                                viajesMostrados.map(viajePasajero => {
                                    return (
                                      <li key={viajePasajero.id} >  
                                        <p>Origen: {viajePasajero.idViaje.ruta.origen.nombre}</p>
                                        <p>Destino: {viajePasajero.idViaje.ruta.destino.nombre}</p>
                                        <p>Fecha: {new Date(viajePasajero.idViaje.fecha).toLocaleDateString()}</p>
                                        <p>Hora: {viajePasajero.idViaje.ruta.horario}</p>
                                        {
                                            (viajePasajero.idViaje.estado === 0) && <button>Cancelar</button>
                                        }
                                      </li>  
                                    )
                                })
                            }
                        </ul>
                    ):(
                        <h4>No se encontraron viajes</h4>
                    )
                }
            </div>
            <Dialog
                open={open}
                onClose={handleCloseCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alertMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} color="primary">
                    Aceptar
                    </Button>
                    <Button onClick={handleCloseCancel} color="primary">
                    Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


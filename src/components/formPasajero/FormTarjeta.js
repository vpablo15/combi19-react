import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from '../../hooks/useForm';
//Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export const FormTarjeta = ({
    action = () => {},
    callback = () => {},
    initialState = {
        numero:'',
        titular:'',
        codigo:'',
        vencimiento:new Date()
    },
    msg = ''
}) => {

    const user = JSON.parse(localStorage.getItem('user'))

    const [values,handleInputChange] = useForm(initialState)

    const [fechaVencimiento, setFechaVencimiento] = useState(new Date(initialState.vencimiento))

    const handleInputChangeDate2 = (fechaDeVenci) => {
        setFechaVencimiento(fechaDeVenci);
    };

    const { numero,titular,codigo} = values

        //Manejador Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => {
        if(alertMsg === "La operación se realizo con exito"){
            window.location.reload()
        }else{
            setOpen(false)
        }
    }
    const [alertMsg, setAlertMsg] = useState("")

    const handleSubmitTarjeta = (e) => {
        e.preventDefault()
        let tarjetaId = ""
        if(user.tarjeta !== null) tarjetaId = user.tarjeta.id
        const nuevaTarjeta = {
            numero,
            titular,
            vencimiento:fechaVencimiento,
            codigo            
        }
        const usuarioActualizado = {
            tarjeta:nuevaTarjeta,
            plan:true
        }
        if(validarTarjeta(nuevaTarjeta)){
            if(msg === "Datos de su tarjeta"){
                action(user.tarjeta.id,nuevaTarjeta).then(res =>{
                    console.log(res)
                })
            }else{
                action(user.id,usuarioActualizado).then(res => {
                    console.log(res)
                    tarjetaId = res.tarjeta
                }) 
            }
            localStorage.setItem('user',JSON.stringify({
                ...user,
                tarjeta:{
                    ...nuevaTarjeta,
                    id:tarjetaId,
                },
                plan:true
            }))   
            setAlertMsg("La operación se realizo con exito")
            handleClickOpen()    
        }else{
            handleClickOpen()
        }
    }

    const validarTarjeta = ({numero,titular,vencimiento,codigo}) => {
        if(numero === "" || titular === "" || codigo === "" || codigo === 0){
            setAlertMsg("Deben estar todos los campos completados");
          return false
        }
        if(numero.length < 15){
            setAlertMsg("El numero de la tarjeta debe tener 16 digitos");
          return false
        }
        if(codigo.length < 3 || codigo.length > 3){
            setAlertMsg("El código de seguridad es incorrecto");
          return false
        }
        if(vencimiento < new Date()){
            setAlertMsg("La fecha de vencimiento es invalida");
          return false
        }
        return true
    }

    return (
        <div>
            <form onSubmit={ handleSubmitTarjeta }>
                <h3>{msg}</h3>
                <br/>
                <label>Numero</label>
                <br/>
                <input 
                    type="text"
                    name="numero"
                    placeholder="0000-0000-0000-0000"
                    autoComplete="off"
                    value={numero}
                    onChange={handleInputChange}/>
                <br/>
                <label>Titular</label>
                <br/>
                <input
                type="text"
                name="titular"
                placeholder="Titular de la tarjeta"
                autoComplete="off"
                value={titular}
                onChange={handleInputChange}/>
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
                    name="codigo"
                    placeholder="Codigo de 3 digitos"
                    autoComplete="off"
                    value={codigo}
                    onChange={handleInputChange}/>
                <button type="submit">Guardar</button>
                <button onClick={callback}>Cancelar</button>
            </form>
            <br/>
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
    )
}

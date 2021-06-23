import React,{ useState,useEffect } from 'react'
 import { listarViajes } from "../../controllers/ViajeABM";
 import { listarLugares } from "../../controllers/LugarABM";
 import { useForm } from "../../hooks/useForm";
 import DatePicker from "react-datepicker";
 import "./viajeslistados.css"

export const ViajesScreen = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [viajes, setviajes] = useState(["cargando"])
    const [lugares,setlugares] = useState([])
    const [viajesFiltrados,setViajesFiltrados] = useState([])
    const [formValues,handleInputChange] = useForm({
        origen:"",
        destino:"",
    })
    const {origen,destino} = formValues;
    const [fecha, setFecha] = useState(new Date());

    useEffect(() => {
        listarViajes().then(res => {
           const resultado = res.filter(each => 
                each.estado !== 2 && each.asientosDisponibles > 0)
           setviajes(resultado)
        })
        listarLugares().then(res => setlugares(res))
    },[])

    const handleInputChangeDate = (unaFecha) => {
       setFecha(unaFecha);
   };

    const inputSubmit = (e) => { 
        e.preventDefault()
        if(fecha < new Date()){
            alert("La fecha no puede ser anterior a la actual")
            return
        }
        const viajesBuscados = viajes.filter((viaje) => 
            viaje.ruta.origen.id === origen && viaje.ruta.destino.id === destino &&
            new Date(viaje.fecha).toLocaleDateString() === new Date(fecha).toLocaleDateString())
        console.log('viaje filtrado',viajesBuscados)
        setViajesFiltrados(viajesBuscados)
    } 

    console.log('Hola mundo')

    if(viajes[0] === "cargando"){
        return (<h1>Cargando...</h1>)
    }
    return (
        <div className="inicio-pasajero">
            <h2>Busque el viaje que desee</h2>
            <hr/>
            <br/>
            <form className="filtro-viajes" onSubmit={inputSubmit}>
                <button  type="submit">Buscar</button>
                <label>Origen:</label>
                <select name="origen" value={origen} onChange={handleInputChange}>
                   <option>Seleccione un origen</option>
                   {lugares.map(({ id,nombre,provincia }) => {
                       return (
                       <option key={id} value={id}>
                           {nombre},{provincia}
                       </option>
                       );
                   })}
                </select>
                <label>Destino:</label>
                <select name="destino" value={destino} onChange={handleInputChange}>
                   <option>Seleccione un destino</option>
                   {lugares.map(({ id,nombre,provincia }) => {
                       return (
                       <option key={id} value={id}>
                           {nombre},{provincia}
                       </option>
                       );
                   })}
                </select>
                <label>Fecha:</label>
                <DatePicker
                   selected={fecha}
                   onChange={handleInputChangeDate}
                   dateFormat="dd-MM-yyyy"
                />
            </form>
            <br/>
            <hr/>
            <br/>
            <div className="listado-viajes">
                    {
                        (viajesFiltrados.length > 0) ? (
                            <ul>
                                {
                                    viajesFiltrados.map(({id,ruta,precio,fecha}) => {
                                        return (
                                            <li key={id}>
                                                <p>Origen: {ruta.origen.nombre}</p>
                                                <p>Destino: {ruta.destino.nombre}</p>
                                                <p>Fecha: {new Date(fecha).toLocaleDateString()}</p>
                                                <p>Hora: {ruta.horario}</p>
                                                <p>Tipo de Combi: {ruta.combi.tipoDeCombi}</p>
                                                {                                            
                                                    (user.plan) ? (
                                                        <p>Precio: ${precio} <b>con descuento ${precio * 0.8}</b></p>
                                                    ):(
                                                        <p>Precio: ${precio}</p>
                                                    )
                                                }
                                                <button>Comprar </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ):(
                            <h1>No hay resultados</h1>
                        )
                    }
            </div>
       </div>
   )
}

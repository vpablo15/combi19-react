 import React, { useEffect, useState } from 'react'
 import { FormComentario } from '../../components/formComentario/FormComentario'
 import {agregarComentario, listarComentarios} from '../../controllers/ComentarioABM'
import { buscarViajePasajeroPorId } from '../../controllers/ViajesPasajerosABM'
 import './estilos.css'
 

 export const HomeScreen = () => {

    const [misViajes, setmisViajes] = useState([])
    const [comentarios, setcomentarios] = useState([])

    const user = JSON.parse(localStorage.getItem("user"))
    const [showForm, setShowForm] = useState(false)

    const obtenerMisViajes = () => buscarViajePasajeroPorId(user.id).then(res => setmisViajes(res))

    useEffect(() => {
        listarComentarios().then((res) => setcomentarios(res))
        obtenerMisViajes()
    })

    return (
         <div className="pasajero-home">
             <h1>Destinos Populares</h1>
             <hr/>
             <div className="destinos">
                 <ul>
                     <li>
                        <div className="item-destinos">
                            <div id="imagen1"></div>
                            <h4>Mar del Plata</h4>
                        </div>
                    </li>
                    <li>
                        <div className="item-destinos">
                            <div id="imagen2"></div>
                            <h4>Carlos Paz</h4>
                        </div>
                    </li>
                    <li>
                        <div className="item-destinos">
                            <div id="imagen3"></div>
                            <h4>Bariloche</h4>
                        </div>
                    </li>
                 </ul>
             </div>
             <hr/>
             <div>
                 Chamuyo descarga la app,Descuentos con tarjeta
             </div>
             <hr/>
             <p>Somos una empresa de viajes que lleva varios años en el 
                 mercado,ldsmkaldkamlskdmasdmaldassdsajndasjdadsadsadnsaldn
             </p>
             <hr/>
             <br/>
               <p id="comentarios">Comentarios</p>
                    {
                        (comentarios.length > 0) ? 
                        <ul className="lista-comentarios">
                            {
                                comentarios.map(({id,comentario,pasajero,fecha}) => {
                                    return (
                                        <li key={id}>
                                            <strong>{pasajero.nombre} {pasajero.apellido}</strong>
                                            <p>{comentario}</p>
                                            <small>{new Date(fecha).toLocaleString()}</small>
                                            <br/>
                                        </li>
                                    )
                                })
                            }
                        </ul>:
                        <p>No se encontraron comentarios</p> 
                    }
               <br/>
               <hr/>
               <br/>
               {
                   (misViajes[0] != null) ?  
                    
                        (!showForm) ? 
                            <button onClick={() => setShowForm(!showForm)}>Agregar Comentario</button>
                        :
                        <FormComentario 
                            action={agregarComentario}
                            callback={() => {setShowForm(!showForm)}}
                            pasajeroId={user.id}/>
                    
                    :
                    <p>Debes tener al menos un viaje finalizado para realizar comentarios</p>
               }
            <br/>
             <br/>
             <hr/>
             <footer>
                 <h3>Derechos Reservados</h3>
                 <div id="contacto">
                    <p><b>Contacto para soporte</b></p>
                    <p>combi19@support.com</p>
                 </div>
                 <ul>
                     <li>Facebook</li>
                     <li>Twitter</li>
                     <li>Instagram</li>
                 </ul>
             </footer>
         </div>
     )
}

 import React from 'react'
 import { NavLink } from 'react-router-dom'
 import './Navbar.css'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faPizzaSlice, faBus, faSignOutAlt, faRoute, faUser ,faMapMarkerAlt, faRoad} from '@fortawesome/free-solid-svg-icons'

 export const Navbar = () => {
     return (
         <nav className="navbar-container">
             <div>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin">Combi19</NavLink>
             </div>
             <div>
                 <FontAwesomeIcon icon={faUser}/>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin/choferes">Choferes</NavLink>
             </div>
             <div>
                 <FontAwesomeIcon icon={faBus}/>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin/combis">Combis</NavLink>
            </div>
            <div>
                 <FontAwesomeIcon icon={faPizzaSlice}/>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin/insumos">Insumos</NavLink>
            </div>
            <div>
                 <FontAwesomeIcon icon={faMapMarkerAlt}/>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin/lugares">Lugares</NavLink>   
            </div>
            <div>
                 <FontAwesomeIcon icon={faRoute}/> 
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin/rutas">Rutas</NavLink> 
            </div>
            <div>
                 <FontAwesomeIcon icon={faRoad}/>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/admin/viajes">Viajes</NavLink>
            </div>
            <div>
                 <FontAwesomeIcon icon={faSignOutAlt}/>
                 <NavLink activeClassName="activelink" className="inactivelink" exact to="/login">Cerrar Sesión</NavLink>
            </div>
         </nav>
     )
 }
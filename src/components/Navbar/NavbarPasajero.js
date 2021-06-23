import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRoad, faSignOutAlt, faComment, faHome } from '@fortawesome/free-solid-svg-icons'

export const NavbarPasajero = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <nav className="navbar-container">
            <div>
                <FontAwesomeIcon icon={faHome}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/home">Inicio</NavLink>
            </div>
            <div>
                <FontAwesomeIcon icon={faRoad}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/viajes">Viajes</NavLink>
            </div>
            <div>
                <FontAwesomeIcon icon={faComment}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/comentarios">Mis comentarios</NavLink>
            </div>
            <div>
                <FontAwesomeIcon icon={faUser}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/pasajero/profile">{user.mail}</NavLink>
                {
                    (user.plan) ? (
                        <small id="gold">Gold</small>
                    ):(
                        <small id="basico">Basico</small>
                    )
                }
            </div>
            <div>
                <FontAwesomeIcon icon={faSignOutAlt}/>
                <NavLink activeClassName="activelink" className="inactivelink" exact to="/login">Cerrar Sesion</NavLink>
            </div>
        </nav>
    )
}
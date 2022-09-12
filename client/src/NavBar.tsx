import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { LoggedInUserContext } from "./Context"


function NavBar() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    return(
        <div className="navbar navbar-dark bg-dark">
            <NavLink
            className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
            to='/'
            >Home</NavLink>
            <NavLink 
            className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
            to={`/${loggedInUser.username}`}
            >{loggedInUser.username}</NavLink>
            <NavLink
            className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
            to='/search'
            >Search</NavLink>
        </div>
    )
}

export default NavBar
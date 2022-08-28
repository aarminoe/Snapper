import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { LoggedInUserContext } from "./Context"


function NavBar() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    return(
        <div>
            <NavLink
            to='/'
            >Home</NavLink>
            <NavLink 
            to={`/${loggedInUser.username}`}
            >{loggedInUser.username}</NavLink>
            <NavLink
            to='/search'
            >Search</NavLink>
        </div>
    )
}

export default NavBar
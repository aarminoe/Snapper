import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { LoggedInUserContext } from "./Context"
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material'
import { BiLogOut } from 'react-icons/bi'

function NavBar() {
 
    function handleLogOut() {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(() => window.location.reload())
    }

    const {loggedInUser} = useContext(LoggedInUserContext)
    return(
        <AppBar position="relative">
            <Toolbar>
                <Typography variant='h6' sx={{flexGrow: 1}}>Snapper</Typography>
                <IconButton>
                    <NavLink
                    className="navbar-toggler" 
                    to='/'
                    ><AiFillHome /></NavLink>
                </IconButton>
                <IconButton>
                    <NavLink 
                    className="navbar-toggler"
                    to={`/${loggedInUser.username}`}
                    >{loggedInUser.username}</NavLink>
                </IconButton>
                <IconButton>
                    <NavLink
                    className="navbar-toggler"
                    to='/search'
                    ><AiOutlineSearch/></NavLink>
                </IconButton>
                <IconButton onClick={handleLogOut}><BiLogOut/>     
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
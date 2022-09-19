import React, { useContext } from "react"
import { BiLogOut } from 'react-icons/bi'

function Header() {
    function handleLogOut() {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(() => window.location.reload())
    }

    return(
        <div className="header">
            <p className="app-title">Snapper</p>
            <p>
                <button className="logout" onClick={handleLogOut}><BiLogOut/></button>
            </p>
        </div>
    )
}

export default Header
import React, { useContext } from "react"


function Header() {
    function handleLogOut() {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(() => window.location.reload())
    }

    return(
        <div>
            Header
            <p>
                <button className="logout" onClick={handleLogOut}>Log Out!</button>
            </p>
        </div>
    )
}

export default Header
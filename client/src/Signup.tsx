import React, { useState, useContext } from "react"
import Login from './Login'
import { LoggedInUserContext } from "./Context"


function Signup() {

    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)

    const [newUser, setNewUser] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    

    function handleSignUp(e:any) {
        e.preventDefault()
        console.log('eh')
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUser,
                password: newPassword,
                password_confirmation: confirmNewPassword,
                avatar_url: 'test',
                bio: 'test'
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => setLoggedInUser(data))
            } else {
            r.json().then((err) => console.log(err.errors))
            }
        })
    }

    return(
        <div>
            <form onSubmit={handleSignUp}>
            <h1>User:
                <input onChange={(e) => setNewUser(e.target.value)}></input>
            </h1>
            <h1>
                Password:
                <input type='password' onChange={(e) => setNewPassword(e.target.value)}></input>
            </h1>
            <h1>
                Confirm Password:
                <input type='password' onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
            </h1>
            <button>Sign Up!</button>
        </form>
        </div>
    )
}

export default Signup
import React, { useState } from "react"
import Login from './Login'


function Signup() {

    const [newUser, setNewUser] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [loggedInUser, setLoggedInUser] = useState(null)

    function handleSignUp(e) {
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
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return(
        <div>
            <form onSubmit={handleSignUp}>
            <h1>User:
                <input onChange={(e) => setNewUser(e.target.value)}></input>
            </h1>
            <h1>
                Password:
                <input onChange={(e) => setNewPassword(e.target.value)}></input>
            </h1>
            <h1>
                Confirm Password:
                <input onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
            </h1>
            <button>Sign Up!</button>
        </form>
        </div>
    )
}

export default Signup
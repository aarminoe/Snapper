import { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoggedInUserContext } from './Context'


function Login() {

    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')



    function handleLogin(e:any) {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: password
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
        <form onSubmit={handleLogin}>
            <h1>User:
                <input onChange={(e) => setUser(e.target.value)}></input>
            </h1>
            <h1>
                Password:
                <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
            </h1>

            <button>Log In</button>
        </form>
    )
}

export default Login
import { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoggedInUserContext } from './Context'


function Login() {

    const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInUserContext)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')



    function handleLogin(e:any) {
        e.preventDefault()

        setIsLoggedIn(true)
    }

    return(
        <form onSubmit={handleLogin}>
            <h1>User:
                <input onChange={(e) => setUser(e.target.value)}></input>
            </h1>
            <h1>
                Password:
                <input onChange={(e) => setPassword(e.target.value)}></input>
            </h1>

            <button>Log In</button>
        </form>
    )
}

export default Login
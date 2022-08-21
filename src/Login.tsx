import { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoggedInContext } from './Context'


function Login() {

    const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    function handleLogin(e) {
        e.preventDefault()
        console.log(user)
        console.log(password)
        console.log(confirmPassword)
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
            <h1>
                Confirm Password:
                <input onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </h1>
            <button>Log In</button>
        </form>
    )
}

export default Login
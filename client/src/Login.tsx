import { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoggedInUserContext } from './Context'
import { Button,Card, Input, CardContent, Typography } from '@mui/material'


function Login() {

    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [userNotFound, setUserNotFound] = useState(false)



    function handleLogin(e: { preventDefault: () => void }) {
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
              r.json().then((data) => {
                setUserNotFound(false)
                setLoggedInUser(data)
            })
            } else {
              r.json().then((err) => {
                setUserNotFound(true)
                console.log(err.errors)
            })
            }
        })
    }

    return(
    <CardContent>
        <Typography variant='h1'>Welcome to Snapper!</Typography>
        <form onSubmit={handleLogin}>
            <h1>User:
                <Input onChange={(e) => setUser(e.target.value)}></Input>
            </h1>
            <h1>
                Password:
                <Input type='password' onChange={(e) => setPassword(e.target.value)}></Input>
            </h1>

            <Button type='submit'>Log In</Button>
            {userNotFound ? <p className='text-danger'>User/Password Not Found</p> : null}
        </form>
    </CardContent>
    )
}

export default Login
import React, { useState, useContext, useEffect } from "react"
import Login from './Login'
import { LoggedInUserContext } from "./Context"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { Button,Input, CardContent, Typography } from '@mui/material'


function Signup() {

    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)

    const [newUser, setNewUser] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [errorsFound, setErrorsFound] = useState(false)
    const [errors, setErrors] = useState(null)
    const [avatar, setAvatar] = useState(null) 

    function handleSignUp(e: { preventDefault: () => void }) {
        e.preventDefault()
        console.log(avatar)
        if (avatar !== null) {
            console.log('Yes')
            const imageRef = ref(storage, `avatars/${avatar.name + newUser}`)
            uploadBytes(imageRef, avatar)
            .then((snap) => {
                getDownloadURL(snap.ref).then((url) => {
                    fetch('/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: newUser,
                            password: newPassword,
                            password_confirmation: confirmNewPassword,
                            avatar_url: url,
                            bio: 'test'
                        })
                    })
                    .then((r) => {
                        if (r.ok) {
                            r.json().then((data) => {
                                setLoggedInUser(data)
                                setErrorsFound(false)
                            })
                        } else {
                            r.json().then((err) => {
                                setErrorsFound(true)
                                setErrors(err.errors)
                                console.log(err.errors)
                            })
                        }
                    })
                })   
            })
        }
        else {
            setErrorsFound(true)
            setErrors(['Please Upload A Profile Picture'])
        }
    }

    return(
        <CardContent>
            <form onSubmit={handleSignUp}>
            <h1>User:
                <Input onChange={(e) => setNewUser(e.target.value)}></Input>
            </h1>
            <h1>
                Password:
                <Input type='password' onChange={(e) => setNewPassword(e.target.value)}></Input>
            </h1>
            <h1>
                Confirm Password:
                <Input type='password' onChange={(e) => setConfirmNewPassword(e.target.value)}></Input>
            </h1>
            <h4>
                <form>
                    Profile Picture: 
                    <input type='file' onChange={(e) => setAvatar(e.target.files[0])}/>
                </form>
            </h4>
            <Button type='submit'>Sign Up!</Button>
            {errorsFound ? errors.map((error:string) => {
                return <p className="text-danger">{error}</p>
            }): null}
        </form>
        </CardContent>
    )
}

export default Signup
import ProfileNav from "./ProfileNav"
import { Route, Routes } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext } from "./Context"
import { useContext } from "react"


function UserProfile() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    return(
        <div>
            <header><ProfileNav/></header>
            <div>
            </div>
        </div>
    )
}

export default UserProfile
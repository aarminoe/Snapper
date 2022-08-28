// import ProfileNav from "./ProfileNav"
import { Route, Routes, NavLink, Outlet } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext } from "./Context"
import { useContext } from "react"
import { Link } from "react-router-dom"


function UserProfile() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    return(
        <div>
            <Link 
            to={`followers`}
            >Followers
            </Link>
            <Link
            to={`notfications`}
            >Notifications</Link>
            <Link
            to={`messages`}
            >Messages</Link>
            <Outlet />
        </div>
    )
}

export default UserProfile
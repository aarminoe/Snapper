import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoggedInUserContext } from "./Context";

function ProfileNav() {
    const {loggedInUser} = useContext(LoggedInUserContext)
    return(
        <div>
            <NavLink 
            to={`/${loggedInUser.username}/followers`}
            >Followers
            </NavLink>
            <NavLink
            to={`/${loggedInUser.username}/notfications`}
            >Notifications</NavLink>
            <NavLink
            to={`/${loggedInUser.username}/messages`}
            >Messages</NavLink>
        </div>
    )
}

export default ProfileNav
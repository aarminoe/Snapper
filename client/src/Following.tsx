import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import React from "react"

function Following() {

    const {loggedInUser} = useContext(LoggedInUserContext)

    console.log(loggedInUser)
    return(
        <div>
            {loggedInUser.follows.map((follow:any) => {
                return (
                    <div>
                        {follow.followed_avatar_url}
                        {follow.followed}
                    </div>
                )
            })}
        </div>
    )
}

export default Following
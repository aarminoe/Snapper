import { useContext } from "react"
import { LoggedInUserContext } from "./Context"


function Followers() {

    const {loggedInUser} = useContext(LoggedInUserContext)

    return(
        <div>
            follower
            {loggedInUser.followers.map((follower:any) => {
                return(
                    <div>
                        Follower here
                        {follower.who_followed}
                    </div>
                )
            })}
        </div>
    )
}

export default Followers
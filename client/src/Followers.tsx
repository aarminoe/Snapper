import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { LoggedInUserContext, ClickedUserContext, UserListContext } from "./Context"


interface FollowerProps {
    who_followed:string;
    who_followed_avatar_url:string;
    user_id:number
}

function Followers() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {userList} = useContext(UserListContext)
    const {setClickedUser} = useContext(ClickedUserContext)

    return(
        <div className="user-tab">
            follower
            {loggedInUser.followers.map((follower:FollowerProps) => {
                console.log(follower)
                return(
                    <div>
                        Follower here
                        <NavLink to='/other_user' onClick={() => {
                            for (let i=0;i < userList.length;i++) {
                                if (userList[i].username === follower.who_followed) {
                                    setClickedUser(userList[i])
                                    break
                                }
                            }
                        }}>{follower.who_followed}</NavLink>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Followers
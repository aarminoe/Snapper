import { useContext } from "react"
import { LoggedInUserContext, UserListContext, ClickedUserContext } from "./Context"
import React from "react"
import { NavLink } from "react-router-dom"

interface FollowProps {
    followed:string;
    followed_avatar_url:string;
    user_id:number
}

function Following() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {setClickedUser} = useContext(ClickedUserContext)
    const {userList} = useContext(UserListContext) 

    return(
        <div>
            {loggedInUser.follows.map((follow:FollowProps) => {
                return (
                    <div>
                        {follow.followed_avatar_url}
                        <NavLink to='/other_user' onClick={() => {
                            for (let i=0;i < userList.length;i++) {
                                if (userList[i].username === follow.followed) {
                                    setClickedUser(userList[i])
                                    break
                                }
                            }
                        }}>
                            {follow.followed}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default Following
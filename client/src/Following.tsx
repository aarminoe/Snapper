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
        <div className="card">
            <div className="user-tab">
                {loggedInUser.follows.map((follow:FollowProps) => {
                    console.log(follow)
                    return (
                        <div>
                            <img className="follow-avatar" src={follow.followed_avatar_url} alt='oops'/>
                            <NavLink className='follow-username' to='/other_user' onClick={() => {
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
        </div>
    )
}

export default Following
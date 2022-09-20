import { useContext, useState } from "react"
import { NavLink, useSearchParams } from "react-router-dom"
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
    const [oneFollower, setOnefollower] = useState(null)

    return(
        <div className="card">
            <div className="user-tab">
                {loggedInUser.followers.map((follower:FollowerProps) => {
                    return(
                        <div>
                            <img className="follow-avatar" src={follower.who_followed_avatar_url} alt='oops!'></img>
                            <NavLink className='follow-username' to='/other_user' onClick={() => {
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
        </div>
    )
}

export default Followers
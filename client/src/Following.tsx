import { useContext } from "react"
import { LoggedInUserContext, UserListContext, ClickedUserContext } from "./Context"
import React from "react"
import { NavLink } from "react-router-dom"

function Following() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {setClickedUser} = useContext(ClickedUserContext)
    const {userList} = useContext(UserListContext)

    console.log(loggedInUser)

    // function handleClickedUser(){
    //     console.log(reply)
    //     for (let i=0;i < userList.length;i++) {
    //         if (userList[i].username === reply.who_commented) {
    //             setClickedUser(userList[i])
    //             break
    //         }
    //     }
    // }

    return(
        <div>
            {loggedInUser.follows.map((follow:any) => {
                return (
                    <div>
                        {follow.who_followed_avatar_url}
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
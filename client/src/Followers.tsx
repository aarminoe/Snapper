import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { LoggedInUserContext, ClickedUserContext, UserListContext } from "./Context"


function Followers() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {userList} = useContext(UserListContext)
    const {setClickedUser} = useContext(ClickedUserContext)

    function handleClickedUser(e:any){
        console.log(e.target.value)
        // for (let i=0;i < userList.length;i++) {
        //     if (userList[i].username === follower.who_followed) {
        //         setClickedUser(userList[i])
        //         break
        //     }
        // }
    }

    return(
        <div className="user-tab">
            follower
            {loggedInUser.followers.map((follower:any) => {
                return(
                    <div>
                        Follower here
                        <NavLink to='/other_user' onClick={handleClickedUser}>{follower.who_followed}</NavLink>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Followers
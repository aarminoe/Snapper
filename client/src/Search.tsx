import React, { useContext, useState } from "react"
import { UserListContext, SearchedUserContext, ClickedUserContext, LoggedInUserContext, ClickedUserFollowers } from "./Context"
import { Link } from "react-router-dom"
import { click } from "@testing-library/user-event/dist/click"


function Search() {

    const {searchText, setSearchText} = useContext(SearchedUserContext)
    const {userList} = useContext(UserListContext)
    const {setClickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)

   

    return(
        <div>
            <form>
                <input type='text' onChange={(e) => setSearchText(e.target.value)}></input>
            </form>
            {userList.map((user:any) => {
                if (user.username.toLowerCase().includes(searchText.toLowerCase()) && user.username !== loggedInUser.username) {
                    return(
                        <div>
                            <Link to={`/other_user`} onClick={() => setClickedUser(user)}>
                                <p>{user.image_url}</p>
                                {user.username}
                            </Link>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Search
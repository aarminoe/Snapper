import React, { useContext, useState } from "react"
import { UserListContext, SearchedUserContext, ClickedUserContext } from "./Context"
import { Link } from "react-router-dom"
import { click } from "@testing-library/user-event/dist/click"


function Search() {

    const {searchText, setSearchText} = useContext(SearchedUserContext)
    const {userList} = useContext(UserListContext)
    const {setClickedUser} = useContext(ClickedUserContext)

    return(
        <div>
            <form>
                <input type='text' onChange={(e) => setSearchText(e.target.value)}></input>
            </form>
            {userList.map((user:any) => {
                if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
                    return(
                        <Link to={`/other_user`} onClick={() => setClickedUser(user)}>
                            <p>{user.image_url}</p>
                            {user.username}
                        </Link>
                    )
                }
            })}
        </div>
    )
}

export default Search
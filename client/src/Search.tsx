import React, { useContext, useState } from "react"
import { UserListContext } from "./Context"


function Search() {

    const [searchText, setSearchText] = useState('')

    const {userList} = useContext(UserListContext)

    return(
        <div>
            <form>
                <input type='text' onChange={(e) => setSearchText(e.target.value)}></input>
            </form>
            {userList.map((user:any) => {
                if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
                    return(
                        <div>
                            {user.username}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Search
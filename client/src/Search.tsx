import React, { useContext, useState } from "react"
import { UserListContext, SearchedUserContext, ClickedUserContext, LoggedInUserContext } from "./Context"
import { Link } from "react-router-dom"
import { click } from "@testing-library/user-event/dist/click"


function Search() {

    const {searchText, setSearchText} = useContext(SearchedUserContext)
    const {userList} = useContext(UserListContext)
    const {setClickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)

    function handleFollowUser(user:any) {
        console.log(user)
        if (user.username !== loggedInUser.username) {
            let hasFollowed = false
            for (let i=0;i<user.followers.length;i++) {
                console.log('hdsadsa')
                if (user.followers[i].who_followed === loggedInUser.username) {
                    hasFollowed = true
                    console.log('already followed')
                }
                else if (hasFollowed = false && i === user.followers.length()) {
                    console.log('not followed yet!')
                    fetch(`/users/${user.id}/followers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            who_followed: loggedInUser.username,
                            who_followed_avatar_url: loggedInUser.image_url,
                            user_id: user.id
                        })
                    })
                    .then(res => res.json())
                    .then(follower => console.log(follower))
                }
            }    
        }
    }

    return(
        <div>
            <form>
                <input type='text' onChange={(e) => setSearchText(e.target.value)}></input>
            </form>
            {userList.map((user:any) => {
                if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
                    return(
                        <div>
                            <Link to={`/other_user`} onClick={() => setClickedUser(user)}>
                                <p>{user.image_url}</p>
                                {user.username}
                            </Link>
                            <button onClick={() => handleFollowUser(user)}>Follow</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Search
import React, { useContext, useState } from "react"
import { UserListContext, SearchedUserContext, ClickedUserContext, LoggedInUserContext, ClickedUserFollowers, LoggedInUserConversationsContext, PostsContext } from "./Context"
import { Link, NavLink } from "react-router-dom"
import { click } from "@testing-library/user-event/dist/click"


function Search() {

    const {searchText, setSearchText} = useContext(SearchedUserContext)
    const {userList} = useContext(UserListContext)
    const {setClickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts} = useContext(PostsContext)

    
    console.log(posts)


    return(
        
        <div>
            <form>
                <input type='text' onChange={(e) => setSearchText(e.target.value)}></input>
            </form>
            {searchText.length > 0 ? <div>{userList.map((user:any) => {
                if (user.username.toLowerCase().includes(searchText.toLowerCase()) && user.username !== loggedInUser.username) {
                    return(
                        <div className="search">
                            <Link className="search-input" to={`/other_user`} onClick={() => setClickedUser(user)}>
                                <p>{user.image_url}</p>
                                {user.username}
                            </Link>
                        </div>
                    )
                }
            })}</div>:null}
            <div className="container">
                {posts.map((post:any) => {
                    return (
                        <div className="card">
                            <h1>{post.title}</h1>
                            {post.user.username === loggedInUser.username ? 
                            <NavLink to={`/${loggedInUser.username}`}>{post.user.username}</NavLink>:
                            <NavLink to='/other_user' onClick={() => {
                                for (let i=0;i < userList.length;i++) {
                                    if (userList[i].username === post.user.username && userList[i].username !== loggedInUser.username) {
                                        setClickedUser(userList[i])
                                        break
                                    }
                                }
                            }}>{post.user.username}</NavLink>}
                            
                            <img className="searched-pic" src={post.image_url}/>
                            <p>Likes({post.post_likes.length})</p>
                        </div>
                    )
                })}
            </div>
        </div> 
    )
}

export default Search
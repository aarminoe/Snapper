// import ProfileNav from "./ProfileNav"
import { Route, Routes, NavLink, Outlet } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from "./Context"
import { useContext, useEffect } from "react"

import { ImageListContext } from "./Context"

import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import Post from "./Post"
import { ConversationsContext } from "./Context"

function UserProfile() {

    const {loggedInUserPosts, setLoggedInUserPosts} = useContext(LoggedInUserPostsContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts} = useContext(PostsContext)
    const {conversations, setConversations} = useContext(ConversationsContext)
    

    useEffect(() => {
        const getUser = async() => {fetch(`/users/${loggedInUser.id}/posts`)
        .then(res => res.json())
        .then(posts => setLoggedInUserPosts(posts))}
        getUser()
    }, [])



    return(
        <div>
            <div className="navbar navbar-dark bg-dark">
                <NavLink 
                className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
                to={`followers`}
                >Followers
                </NavLink>
                <NavLink
                className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
                to={`following`}
                >Following</NavLink>
                <NavLink
                className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"
                to={`messages`}
                >Messages</NavLink>
            </div>
                <Outlet />
            <img className='avatar' src={loggedInUser.avatar_url} />
            <div>
                {posts.map((post:any) => {
                    if (post.user_id === loggedInUser.id) {
                        return <Post url={post.image_url} post={post}/>
                    }         
                })}
            </div>
        </div>
        
    )
}

export default UserProfile
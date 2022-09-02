// import ProfileNav from "./ProfileNav"
import { Route, Routes, NavLink, Outlet } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from "./Context"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { ImageListContext } from "./Context"
import UserPosts from "./UserPosts"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import Post from "./Post"

function UserProfile() {

    const {loggedInUserPosts, setLoggedInUserPosts} = useContext(LoggedInUserPostsContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts} = useContext(PostsContext)

    useEffect(() => {
        const getUser = async() => {fetch(`/users/${loggedInUser.id}/posts`)
        .then(res => res.json())
        .then(posts => setLoggedInUserPosts(posts))}
        getUser()
    }, [])

    console.log(loggedInUserPosts)

    
    console.log('wow')
    return(
        <div>
            <Link 
            to={`followers`}
            >Followers
            </Link>
            <Link
            to={`notfications`}
            >Notifications</Link>
            <Link
            to={`messages`}
            >Messages</Link>
            <Outlet />
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
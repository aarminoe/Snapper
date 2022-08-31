// import ProfileNav from "./ProfileNav"
import { Route, Routes, NavLink, Outlet } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext } from "./Context"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ImageListContext } from "./Context"
import UserPosts from "./UserPosts"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'


function UserProfile() {

    const {loggedInUser} = useContext(LoggedInUserContext)
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
                {loggedInUser.posts.map((post:any) => {
                    return <UserPosts url={post.image_url}/>
                })}
            </div>
        </div>
    )
}

export default UserProfile
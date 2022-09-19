// import ProfileNav from "./ProfileNav"
import { Route, Routes, NavLink, Outlet, useSearchParams } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext, LoggedInUserConversationsContext } from "./Context"
import { useContext, useEffect, useState } from "react"

import { ImageListContext } from "./Context"

import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import Post from "./Post"
import { ConversationsContext } from "./Context"


interface PostProps {
    comments: any;
    edit:boolean;
    id:number;
    image_url:string;
    post_likes:any;
    tags:any;
    title:string;
    user:any;
    user_id:number
}



function UserProfile() {

    const {loggedInUserPosts, setLoggedInUserPosts} = useContext(LoggedInUserPostsContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts} = useContext(PostsContext)
    const {conversations, setConversations} = useContext(ConversationsContext)
    const [willEdit, setWillEdit] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)
    
    console.log(loggedInUser)

    useEffect(() => {
        fetch(`/users/${loggedInUser.id}/conversations`)
        .then(res => res.json())
        .then(userConversations => setLoggedInUserConversations(userConversations))
    }, [])

    useEffect(() => {
        const getUser = async() => {fetch(`/users/${loggedInUser.id}/posts`)
        .then(res => res.json())
        .then(posts => setLoggedInUserPosts(posts))}
        getUser()
    }, [])

    function handleChangeAvatar(e: { preventDefault: () => void }){
        e.preventDefault()
        if (avatar !== null) {
            const deletedRef = ref(storage, loggedInUser.avatar_url)
            deleteObject(deletedRef)
            const imageRef = ref(storage, `avatars/${avatar.name + loggedInUser.username}`)
            console.log(imageRef)
            uploadBytes(imageRef, avatar)
            .then((snap) => {
                getDownloadURL(snap.ref).then((url) => {
                    fetch(`/users/${loggedInUser.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            avatar_url: url
                        })
                    })
                    .then(res => res.json())
                    .then(updatedUser => console.log(updatedUser))
                })
            })
        }
    }



    return(
        <LoggedInUserConversationsContext.Provider value={{loggedInUserConversations, setLoggedInUserConversations}}>
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
            <img className='avatar' src={loggedInUser.avatar_url} alt='oops!'/>
            <button onClick={() => setWillEdit((willEdit) => !willEdit)}>
                Edit Profile
            </button>
            {willEdit ? 
                <form onSubmit={handleChangeAvatar}>
                    <input type='file' onChange={(e) => setAvatar(e.target.files[0])}/>
                    <button>Change Avatar</button>
                </form> 
                : null}
                <Outlet />
            <div>
                {posts.map((post:PostProps) => {
                    if (post.user_id === loggedInUser.id) {
                        return <Post url={post.image_url} post={post}/>
                    }         
                })}
            </div>
            </LoggedInUserConversationsContext.Provider>
        
    )
}

export default UserProfile
// import ProfileNav from "./ProfileNav"
import { Route, Routes, NavLink, Outlet, useSearchParams } from "react-router-dom"
import Followers from "./Followers"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext, LoggedInUserConversationsContext } from "./Context"
import { useContext, useEffect, useState } from "react"
import { AiFillMail } from 'react-icons/ai'
import { ImageListContext } from "./Context"

import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import Post from "./Post"
import { ConversationsContext } from "./Context"
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"


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

    // <AppBar >
    //         <Toolbar>
    //             <Typography variant='h6' sx={{flexGrow: 1}}>Snapper</Typography>
    //             <IconButton>
    //                 <NavLink
    //                 className="navbar-toggler" 
    //                 to='/'
    //                 ><AiFillHome /></NavLink>
    //             </IconButton>
    //             <IconButton>
    //                 <NavLink 
    //                 className="navbar-toggler"
    //                 to={`/${loggedInUser.username}`}
    //                 >{loggedInUser.username}</NavLink>
    //             </IconButton>
    //             <IconButton>
    //                 <NavLink
    //                 className="navbar-toggler"
    //                 to='/search'
    //                 ><AiOutlineSearch/></NavLink>
    //             </IconButton>
    //             <IconButton onClick={handleLogOut}><BiLogOut/>     
    //             </IconButton>
    //         </Toolbar>
    //     </AppBar>


    return(
        <LoggedInUserConversationsContext.Provider value={{loggedInUserConversations, setLoggedInUserConversations}}>
            <AppBar position="relative">
                <Toolbar>
               
                    <Typography variant='h6' sx={{flexGrow: 1}}></Typography>
                        <IconButton>
                            <NavLink 
                            className="navbar-toggler"
                            to={`followers`}
                            >Followers
                            </NavLink>        
                        </IconButton>
                        <IconButton>
                            <NavLink
                            className="navbar-toggler"
                            to={`following`}
                            >Following</NavLink>
                        </IconButton>
                        <IconButton>
                            <NavLink
                            className="navbar-toggler"
                            to={`messages`}
                            ><AiFillMail /></NavLink>
                        </IconButton>
              
                </Toolbar>
            </AppBar>
                        <Outlet />
                    <img className='avatar' src={loggedInUser.avatar_url} alt='oops!'/>
                    <p className="username-profile">{loggedInUser.username}</p>
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
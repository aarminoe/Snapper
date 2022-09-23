
import React, { useContext, useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { PostsContext, ClickedUserContext, LoggedInUserContext, ClickedUserFollowers, UserListContext, LoggedInUserConversationsContext, ConversationMessagesContext } from "./Context"
import Post from "./Post"
import { Button,Box, Card, CardContent, Typography } from '@mui/material'

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

function OtherUserProfile() {

    
    const {posts} = useContext(PostsContext)
    const {clickedUser, setClickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {userList} = useContext(UserListContext)
   
    
   
    
    const [seeFollowers, setSeeFollowers] = useState(false)
    const [usersFollowers, setUsersFollowers] = useState(clickedUser.followers)
    const [usersFollowing, setUsersFollowing] = useState(clickedUser.follows)
    const [newMessageText, setNewMessageText] = useState('')
    const [newMessageClick, setNewMessageClick] = useState(false)
    const [following, setFollowing] = useState(false)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)
    const [seeFollowing, setSeeFollowing] = useState(false)
    const [date, setDate] = useState('')
    

    console.log(clickedUser)
    useEffect(() => {
        fetch(`/users/${loggedInUser.id}/follows`)
        .then(res => res.json())
        .then(follows => {
            if (follows.length !== 0) {
                console.log(follows)
                for (let i=0;i<follows.length;i++) {
                    if (follows[i].followed === clickedUser.username) {
                        setFollowing(true)
                    }
                }
            }
        })
    },[])

    function handleFollowUser() {
        setFollowing((following) => !following)
        if (clickedUser.username !== loggedInUser.username) {
            console.log('here')
            let hasFollowed = false
            console.log(usersFollowers.length)
            if (usersFollowers.length === 0) {
                console.log('not followed yet!')
                    fetch(`/users/${clickedUser.id}/followers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            who_followed: loggedInUser.username,
                            who_followed_avatar_url: loggedInUser.avatar_url,
                            user_id: clickedUser.id
                        })
                    })
                    .then(res => res.json())
                    .then(follower => {
                        const updatedList = [...usersFollowers, follower]
                        setUsersFollowers(updatedList)
                    })
                    fetch(`/users/${loggedInUser.id}/follows`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            followed: clickedUser.username,
                            followed_avatar_url: clickedUser.avatar_url,
                            user_id: loggedInUser.id
                        })
                    })
                    .then(res => res.json())
                    .then(follow => console.log(follow))
            }
            else {
                for (let i=0;i<usersFollowers.length;i++) {
                    if (usersFollowers[i].who_followed === loggedInUser.username) {
                        hasFollowed = true
                        console.log('already followed')
                        const updatedList = usersFollowers.filter((follower:any) => {
                            return follower !== usersFollowers[i]
                        })
                        setUsersFollowers(updatedList)
                        fetch(`/users/${clickedUser.id}/followers/${usersFollowers[i].id}`, {
                            method: 'DELETE'
                        })
                        fetch(`/users/${clickedUser.id}/follows/${usersFollowers[i].id}`, {
                            method: 'DELETE'
                        })
                        break
                    }
                    else if (hasFollowed === false && i === usersFollowers.length -1) {
                        console.log('not followed yet!')
                        fetch(`/users/${clickedUser.id}/followers`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                who_followed: loggedInUser.username,
                                who_followed_avatar_url: loggedInUser.avatar_url,
                                user_id: clickedUser.id
                            })
                        })
                        .then(res => res.json())
                        .then(follower => {
                            const updatedList = [...usersFollowers, follower]
                            setUsersFollowers(updatedList)
                        })
                        fetch(`/users/${loggedInUser.id}/follows`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                followed: clickedUser.username,
                                followed_avatar_url: clickedUser.avatar_url,
                                user_id: loggedInUser.id
                            })
                        })
                        .then(res => res.json())
                        .then(follow => console.log(follow))
                    }
                }    

            }
        }
    }

    function sendMessage(e: { preventDefault: () => void }) {
        e.preventDefault()
        setDate(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now()));
        let hasConversation = false
        for (let i=0;i<loggedInUser.conversations.length;i++) {
            console.log(loggedInUser.conversations[i])
            if (loggedInUser.conversations[i].receiver === clickedUser.username) {
                console.log('has conversation')
                hasConversation = true
                fetch(`/conversations/${loggedInUser.conversations[i].id}/messages`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: newMessageText,
                        who_messaged: loggedInUser.username,
                        who_messaged_avatar_url: loggedInUser.avatar_url,
                        conversation_id: loggedInUser.conversations[i].id,
                        date: date
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setNewMessageText('')
                })
            }
        }
        if (hasConversation !== true) {
            console.log('does not have convo')
            fetch(`/conversations`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: loggedInUser.username, 
                    sender_avatar_url: loggedInUser.avatar_url,
                    receiver: clickedUser.username,
                    receiver_avatar_url: clickedUser.avatar_url
                })
            })
            .then(res => res.json())
            .then(conversation => {
                const updatedList = [...loggedInUserConversations, conversation]
                setLoggedInUserConversations(updatedList)
                console.log(updatedList)
                fetch(`/user_conversations`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: clickedUser.id,
                        conversation_id: conversation.id
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
                fetch(`/user_conversations`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: loggedInUser.id,
                        conversation_id: conversation.id
                    })
                })
                .then(res => res.json())
                .then(data => { 
                    fetch(`/conversations/${conversation.id}/messages`, {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: newMessageText,
                            who_messaged: loggedInUser.username,
                            who_messaged_avatar_url: loggedInUser.avatar_url,
                            conversation_id: conversation.id
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setNewMessageText('')
                    })
                })             
            })
        }
    }
   
    return(
        <LoggedInUserConversationsContext.Provider value={{loggedInUserConversations, setLoggedInUserConversations}}>
        <div>
            <Card>
                <img className="avatar" src={clickedUser.avatar_url}></img>
                <p className="username-profile">{clickedUser.username}</p>
                <Button onClick={() => {setNewMessageClick((newMessageClick) => !newMessageClick)}}>Message!</Button>
                {newMessageClick ? <form onSubmit={sendMessage}>
                    <input type='text' value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)}/>
                    <Button type='submit'>Send</Button>
                </form>: null}
                <div>
                    <Button onClick={() =>{ 
                        setUsersFollowers(clickedUser.followers)
                        setSeeFollowers((seeFollowers) => !seeFollowers)
                        setSeeFollowing(false)
                        }}>Followers ({usersFollowers.length})</Button>
                    <Button onClick={() => {
                        setUsersFollowing(clickedUser.follows)
                        setSeeFollowing((seeFollowing) => !seeFollowing)
                        setSeeFollowers(false)
                        }}>Following ({usersFollowing.length})</Button>
                    <div>
                        {following ? <Button onClick={handleFollowUser}>Unfollow</Button> 
                        : <Button onClick={handleFollowUser}>Follow</Button>}
                    </div>
                </div>
            </Card>
            {seeFollowers ? <Card>{usersFollowers.map((follower:any) => {
                return(
                    <div>
                        <img className="follow-avatar" src={follower.who_followed_avatar_url} alt='oops!'/>
                        {loggedInUser.username === follower.who_followed ? <NavLink className='follow-username' to={`/${loggedInUser.username}`}>{follower.who_followed}</NavLink>:
                        <NavLink className='follow-username' onClick={() => {
                            for (let i=0;i < userList.length;i++) {
                                if (userList[i].username === follower.who_followed) {
                                    console.log(userList[i])
                                    setSeeFollowers(false)
                                    setClickedUser(userList[i])
                                    setUsersFollowers(clickedUser.followers)
                                    break
                                }
                            }
                        }} to='/other_user'>{follower.who_followed}</NavLink> } 
                    </div>
                )
            })}</Card> : null}
            {seeFollowing ? <Card>{usersFollowing.map((follow:any) => {
                return(
                    <div>
                        <img className="follow-avatar" src={follow.followed_avatar_url} alt='oops!' />
                        {loggedInUser.username === follow.who_followed ? <NavLink className='follow-username' to={`/${loggedInUser.username}`}>{follow.followed}</NavLink>:
                        <div>
                            
                            <NavLink onClick={() => {
                            for (let i=0;i < userList.length;i++) {
                                console.log(follow)
                                if (userList[i].username === follow.followed) {
                                    setSeeFollowing(false)
                                    setClickedUser(userList[i])
                                    setUsersFollowing(clickedUser.follows)
                                    break
                                }
                            }
                        }} className='follow-username' to='/other_user'>{follow.followed}</NavLink>
                        </div>    
                         }       
                    </div>
                )
            })}</Card> : null}
            <div>
                {posts.map((post:PostProps) => {
                    if (post.user_id === clickedUser.id) {
                        return (
                        <ClickedUserFollowers.Provider value={{usersFollowers, setUsersFollowers}}>
                            <Post url={post.image_url} post={post}/>
                        </ClickedUserFollowers.Provider>
                        )
                    }         
                })}
            </div>
        </div>
        </LoggedInUserConversationsContext.Provider>
    )
}

export default OtherUserProfile
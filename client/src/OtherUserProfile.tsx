import { click } from "@testing-library/user-event/dist/click"
import React, { useContext, useState, useEffect } from "react"
import { PostsContext, ClickedUserContext, LoggedInUserContext, ClickedUserFollowers, ConversationsContext, LoggedInUserConversationsContext } from "./Context"
import Post from "./Post"


function OtherUserProfile() {

    
    const {posts} = useContext(PostsContext)
    const {clickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    
   
    
    const [seeFollowers, setSeeFollowers] = useState(false)
    const [usersFollowers, setUsersFollowers] = useState(clickedUser.followers)
    const [newMessageText, setNewMessageText] = useState('')
    const [newMessageClick, setNewMessageClick] = useState(false)
    const [following, setFollowing] = useState(false)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)


    
    // window.onbeforeunload = (e) => {
    //     console.log('no')
    //     e.preventDefault()
    //     return false
    // }

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

    function handleSeeFollowers() {
        setSeeFollowers((seeFollowers) => !seeFollowers)
    }

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
                            who_followed_avatar_url: loggedInUser.image_url,
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
                            followed_avatar_url: clickedUser.image_url,
                            user_id: loggedInUser.id
                        })
                    })
                    .then(res => res.json())
                    .then(follow => console.log(follow))
            }
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
                else if (hasFollowed === false && i === usersFollowers.length) {
                    console.log('not followed yet!')
                    fetch(`/users/${clickedUser.id}/followers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            who_followed: loggedInUser.username,
                            who_followed_avatar_url: loggedInUser.image_url,
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
                            followed_avatar_url: clickedUser.image_url,
                            user_id: loggedInUser.id
                        })
                    })
                    .then(res => res.json())
                    .then(follow => console.log(follow))
                }
            }    
        }
    }

    function sendMessage(e:any) {
        e.preventDefault()
        console.log(loggedInUser.conversations)
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
                        who_messaged_avatar_url: loggedInUser.image_url,
                        conversation_id: loggedInUser.conversations[i].id
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
                    sender_avatar_url: loggedInUser.image_url,
                    receiver: clickedUser.username,
                    receiver_avatar_url: clickedUser.image_url
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
                            who_messaged_avatar_url: loggedInUser.image_url,
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
            {clickedUser.username}
            <button onClick={() => {setNewMessageClick((newMessageClick) => !newMessageClick)}}>Message!</button>
            {newMessageClick ? <form onSubmit={sendMessage}>
                <input type='text' value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)}/>
                <button>Send</button>
            </form>: null}
            <div>
                <button onClick={handleSeeFollowers}>See Followers</button>
                <div>
                    {following ? <button onClick={handleFollowUser}>Following!</button> 
                    : <button onClick={handleFollowUser}>Follow</button>}
                </div>
            </div>
            {seeFollowers ? <p>{usersFollowers.map((follower:any) => {
                return(
                    <div>
                        follower
                        {follower.who_followed}
                    </div>
                )
            })}</p> : null}
            <div>
                {posts.map((post:any) => {
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
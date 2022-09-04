import { click } from "@testing-library/user-event/dist/click"
import React, { useContext, useState } from "react"
import { PostsContext, ClickedUserContext, LoggedInUserContext, ClickedUserFollowers, ConversationsContext } from "./Context"
import Post from "./Post"


function OtherUserProfile() {

    
    const {posts} = useContext(PostsContext)
    const {clickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    
    const [seeFollowers, setSeeFollowers] = useState(false)
    const [usersFollowers, setUsersFollowers] = useState(clickedUser.followers)
    const [newMessageText, setNewMessageText] = useState('')
    const [newMessageClick, setNewMessageClick] = useState(false)

    function handleSeeFollowers() {
        setSeeFollowers((seeFollowers) => !seeFollowers)
    }

    function handleFollowUser() {
        if (clickedUser.username !== loggedInUser.username) {
            let hasFollowed = false
            for (let i=0;i<clickedUser.followers.length;i++) {
                console.log('hdsadsa')
                if (clickedUser.followers[i].who_followed === loggedInUser.username) {
                    hasFollowed = true
                    console.log('already followed')
                }
                else if (hasFollowed === false && i === clickedUser.followers.length -1) {
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
                fetch(`/conversations/${loggedInUser.conversation[i].id}/messages`, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: newMessageText,
                        who_messaged: loggedInUser.username,
                        who_messaged_avatar_url: loggedInUser.image_url,
                        conversation_id: loggedInUser.conversation[i].id
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
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
                    .then(data => console.log(data))
                })             
            })
        }
    }

    return(
        <div>
            {clickedUser.username}
            <button onClick={() => {setNewMessageClick((newMessageClick) => !newMessageClick)}}>Message!</button>
            {newMessageClick ? <form onSubmit={sendMessage}>
                <input type='text' onChange={(e) => setNewMessageText(e.target.value)}/>
                <button>Send</button>
            </form>: null}
            <div>
                <button onClick={handleSeeFollowers}>See Followers</button>
                <div>
                    <button onClick={handleFollowUser}>Follow!</button>
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
    )
}

export default OtherUserProfile
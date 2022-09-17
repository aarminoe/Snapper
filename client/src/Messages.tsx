import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import { ConversationsContext, LoggedInUserConversationsContext } from "./Context"
import React, {useState, useEffect } from "react"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)
    const [messageText, setMessageText] = useState('')


    return(
        <LoggedInUserConversationsContext.Provider value={{loggedInUserConversations, setLoggedInUserConversations}}>
        <div>
            messages
            <div>
                {loggedInUserConversations.map((conversation:any) => {
                    return(
                        <div className="card">
                            <p>
                                {conversation.sender === loggedInUser.username ? 
                                <p>
                                    {conversation.receiver} 
                                </p>
                                : 
                                <p>
                                    {conversation.sender}
                                </p>
                                }
                            </p>
                            <p>{conversation.messages.map((message:any) => {
                                console.log(message)
                                return(
                                    <div>
                                        <img className="avatar-comment" src={message.who_messaged_avatar_url} alt='oops'></img>
                                        {message.who_messaged}
                                        <p>{message.date}</p>
                                        {message.message}
                                    </div>
                                )
                            })}</p>
                            <form onSubmit={(e:any) => {
                                e.preventDefault()
                                fetch(`/conversations/${conversation.id}/messages`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        message: messageText,
                                        who_messaged: loggedInUser.username,
                                        who_messaged_avatar_url: loggedInUser.avatar_url,
                                        conversation_id: conversation.id
                                    })
                                    
                                })
                            }}>
                                <input onChange={(e) => setMessageText(e.target.value)}></input>
                                <button>Reply</button>
                            </form>
                        </div>
                    )
                })}

            </div>
        </div>
        </LoggedInUserConversationsContext.Provider>
    )
}

export default Messages
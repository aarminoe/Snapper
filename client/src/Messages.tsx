import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import { ConversationsContext, LoggedInUserConversationsContext } from "./Context"
import React, {useState, useEffect } from "react"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)


    // useEffect(() => {
    //     fetch(`/users/${loggedInUser.id}/conversations`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }, [])

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
                                return(
                                    <p>
                                        <p>{message.date}</p>
                                        {message.message}
                                    </p>
                                )
                            })}</p>
                        </div>
                    )
                })}

            </div>
        </div>
        </LoggedInUserConversationsContext.Provider>
    )
}

export default Messages
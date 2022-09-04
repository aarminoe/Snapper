import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import { ConversationsContext } from "./Context"
import React, {useState, useEffect } from "react"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)


    // useEffect(() => {
    //     fetch(`/users/${loggedInUser.id}/conversations`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }, [])

    return(
        <div>
            messages
            <div>
                {loggedInUser.conversations.map((conversation:any) => {
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
                                        {message.message}
                                    </p>
                                )
                            })}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Messages
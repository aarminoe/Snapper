import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import { ConversationsContext } from "./Context"
import React, {useState} from "react"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)

    console.log(conversations)

    return(
        <div>
            messages
            <div>
                {loggedInUser.conversations.map((conversation:any) => {
                    return(
                        <div>
                            <p>
                                {conversation.receiver}
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
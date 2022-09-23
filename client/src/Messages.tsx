import { useContext } from "react"
import { ConversationMessagesContext, LoggedInUserContext } from "./Context"
import { ConversationsContext, LoggedInUserConversationsContext } from "./Context"
import React, {useState, useEffect } from "react"
import Message from "./Message"
import ConversationMessages from "./ConversationMessages"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)
    const {loggedInUserConversations} = useContext(LoggedInUserConversationsContext)
    const [messageText, setMessageText] = useState('')
    const [seeMessages, setSeeMessages] = useState(false)
    const [conversationMessages, setConversationMessages] = useState(null)

    

    console.log(loggedInUser.conversations)

    return(
        
        <div>
            <div>
                {loggedInUser.conversations.map((conversation:any) => {
                    console.log(conversation)
                    return(
                        <ConversationMessages conversation={conversation}/>
                    )
                })}

            </div>
        </div>
        
    )
}

export default Messages
import { useContext } from "react"
import { ConversationMessagesContext, LoggedInUserContext } from "./Context"
import { ConversationsContext, LoggedInUserConversationsContext } from "./Context"
import React, {useState, useEffect } from "react"
import Message from "./Message"
import ConversationMessages from "./ConversationMessages"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)
    const [loggedInUserConversations, setLoggedInUserConversations] = useState(loggedInUser.conversations)
    const [messageText, setMessageText] = useState('')
    const [seeMessages, setSeeMessages] = useState(false)
    const [conversationMessages, setConversationMessages] = useState(null)


    return(
        <LoggedInUserConversationsContext.Provider value={{loggedInUserConversations, setLoggedInUserConversations}}>
        <div>
            messages
            <div>
                {loggedInUserConversations.map((conversation:any) => {
                    return(
                        <ConversationMessages conversation={conversation}/>
                    )
                })}

            </div>
        </div>
        </LoggedInUserConversationsContext.Provider>
    )
}

export default Messages
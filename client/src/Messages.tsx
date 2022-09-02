import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import { ConversationsContext } from "./Context"
import React, {useState} from "react"

function Messages() {

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {conversations, setConversations} = useContext(ConversationsContext)

    

    return(
        <div>
            <div>
                {loggedInUser.conversations.map((conversation:any) => {
                    return(
                        <div>
                            convo
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Messages
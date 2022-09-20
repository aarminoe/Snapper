import { useContext, useEffect, useState } from "react"
import Message from "./Message"
import { LoggedInUserContext } from "./Context"

interface MessageProps {
    conversation_id: number;
    date?:string;
    id:number;
    message:string;
    who_messaged:string;
    who_messaged_avatar_url:string
}

function ConversationMessages({conversation}: any) {

    const {loggedInUser} = useContext(LoggedInUserContext)

    const [conversationMessageList, setConversationMessageList] = useState<MessageProps[]>(conversation.messages)
    const [messageText, setMessageText] = useState('')
    const [seeMessages, setSeeMessages] = useState(false)

    

    console.log(conversation)

    return(
        <div className="card">
                            <div>
                                {conversation.sender === loggedInUser.username ? 
                                <p>
                                    <img className="conversation-avatar" src={conversation.receiver_avatar_url}/>
                                    <p className="conversation-user">
                                        {conversation.receiver} 
                                    </p>
                                </p>
                                : 
                                <p>
                                    <img className="conversation-avatar" src={conversation.sender_avatar_url}/>
                                    <p className="conversation-user">
                                        {conversation.sender}
                                    </p>
                                </p>
                                }
                                <p>
                                    <button onClick={() => {  
                                        console.log(conversationMessageList)
                                        setSeeMessages((seeMessages) => !seeMessages)}
                                        }>Expand Messages</button>
                                </p>
                            </div>
                            {seeMessages ? 
                            <div>
                                <p>{conversationMessageList.map((message:MessageProps) => {
                                    return <Message message={message} conversation={conversation} />
                                })}</p>
                                <form onSubmit={(e) => {
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
                                    .then(res => res.json())
                                    .then(newMessage => {
                                        setMessageText('')
                                        const updatedList = [...conversationMessageList, newMessage]
                                        setConversationMessageList(updatedList)
                                    })
                                }}>
                                    <input value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
                                    <button>Reply</button>
                                </form>
                            </div>
                            : 
                            <div className="card">
                                <img className="avatar-comment" src={conversationMessageList[conversationMessageList.length -1].who_messaged_avatar_url} alt='oops'/>
                                <h5>{conversationMessageList[conversationMessageList.length -1].who_messaged}</h5>
                                {conversationMessageList[conversationMessageList.length -1].message}
                                <form onSubmit={(e) => {
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
                                    .then(res => res.json())
                                    .then(newMessage => {
                                        setMessageText('')
                                        const updatedList = [...conversationMessageList, newMessage]
                                        setConversationMessageList(updatedList)
                                    })
                                }}>
                                    <input value={messageText} onChange={(e) => setMessageText(e.target.value)}></input>
                                    <button>Reply</button>
                                </form>
                            </div>}
                        </div>
    )
}

export default ConversationMessages
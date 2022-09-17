import { useState } from "react"


function Message({message, conversation}: any) {


    return(
        <div>
            <div className="card">
                <img className="avatar-comment" src={message.who_messaged_avatar_url} alt='oops'></img>
                <h5>{message.who_messaged}</h5>
                <p>
                    {message.message}
                </p>
            </div>
        </div>
    )
}

export default Message
import { useState } from "react"
import { Button,Box, Card, CardContent, Typography } from '@mui/material'

function Message({message, conversation}: any) {


    return(
        <div>
            <Card className="card">
                <img className="avatar-comment" src={message.who_messaged_avatar_url} alt='oops'></img>
                <div className="who-messaged">{message.who_messaged}</div>
                <p className="message-message">
                    {message.message}
                </p>
            </Card>
        </div>
    )
}

export default Message
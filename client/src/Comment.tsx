import CommentReply from "./CommentReply"
import React, { useState } from "react"



function Comment({comment}:any) {

    const [seeReplyComment, setSeeReplyComment] = useState(false)
    const [newReply, setNewReply] = useState('')

    return(
        <div>
            Comment
            {comment.comment}
            <button onClick={() => setSeeReplyComment((seeReplyComment) => !seeReplyComment)}>reply</button>
            {seeReplyComment ? <input type='text' onChange={(e) => setNewReply(e.target.value)}/> : null}
            {comment.comment_replies.map((reply:any) => {
                return <CommentReply reply={reply} />
            })}
        </div>
    )
}


export default Comment
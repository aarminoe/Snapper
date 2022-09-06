import CommentReply from "./CommentReply"
import React, { useContext, useState } from "react"
import { LoggedInUserContext, CommentsContext } from "./Context"


function Comment({comment}:any) {

    const [seeReplyComment, setSeeReplyComment] = useState(false)
    const [newReply, setNewReply] = useState('')
    const [commentReplies, setCommentReplies] = useState(comment.comment_replies)

    const {loggedInUser} = useContext(LoggedInUserContext)
    const {comments, setComments} = useContext(CommentsContext)

    function handleCommentReply(e:any) {
        e.preventDefault()
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}/comment_replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reply: newReply,
                who_commented: loggedInUser.username,
                who_commented_avatar_url: loggedInUser.image_url,
                comment_id: comment.id
            })
        })
        .then(resp => resp.json())
        .then(reply => {
            console.log(reply)
            const updatedList = [...commentReplies, reply]
            setCommentReplies(updatedList)
        })
    }

    function handleDeleteComment() {
        console.log(comments)
        console.log(comment)
        const updatedList = comments.filter((deletedComment:any) => {
            return deletedComment !== comment
        })
        setComments(updatedList)
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}`, {
            method: 'DELETE'
        })
    }

    return(
        <div>
            Comment
            <button onClick={handleDeleteComment}>X</button>
            <img src={comment.who_commented_avatar_url} alt='oops!'></img>
            <h3>{comment.who_commented}</h3>
            {comment.comment}
            <button onClick={() => setSeeReplyComment((seeReplyComment) => !seeReplyComment)}>reply</button>
            {seeReplyComment ? 
            <div>
                <form onSubmit={handleCommentReply}>
                    <input type='text' onChange={(e) => setNewReply(e.target.value)}/> 
                    <button>add</button>
                </form>
                {commentReplies.map((reply:any) => {
                return <CommentReply reply={reply} />
            })}
            </div>
            : null}
            
        </div>
    )
}


export default Comment
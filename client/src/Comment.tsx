import CommentReply from "./CommentReply"
import React, { useContext, useState } from "react"
import { LoggedInUserContext, CommentsContext, CommentRepliesContext } from "./Context"


function Comment({comment, post}:any) {

    const [seeReplyComment, setSeeReplyComment] = useState(false)
    const [newReply, setNewReply] = useState('')
    const [commentReplies, setCommentReplies] = useState([...comment.comment_replies.reverse()])

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
            const updatedList = [...commentReplies.reverse(), reply]
            setCommentReplies(updatedList.reverse())
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

    console.log(comment)

    return(
        <CommentRepliesContext.Provider value={{commentReplies, setCommentReplies}}>
            Comment
            {comment.who_commented === loggedInUser.username || post.user_id === loggedInUser.id ? <button onClick={handleDeleteComment}>X</button>: null}
            <img src={comment.who_commented_avatar_url} alt='oops!'></img>
            <h3>{comment.who_commented}</h3>
            {comment.comment}
            <button onClick={() => setSeeReplyComment((seeReplyComment) => !seeReplyComment)}>reply</button>
            {seeReplyComment ? 
            <div>
                <form onSubmit={handleCommentReply}>
                    <input type='text' onChange={(e) => setNewReply(e.target.value)}/> 
                    <button>reply</button>
                </form>
                {commentReplies.map((reply:any) => {
                return <CommentReply reply={reply} comment={comment} post={post}/>
            })}
            </div>
            : null}
            
        </CommentRepliesContext.Provider>
    )
}


export default Comment
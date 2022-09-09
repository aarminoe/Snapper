import { useContext, useState } from "react"
import { CommentRepliesContext, LoggedInUserContext } from "./Context"


function  CommentReply({reply, comment, post}:any){

    const {commentReplies, setCommentReplies} = useContext(CommentRepliesContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const [isEdit, setIsEdit] = useState(false)
    const [editReplyText, setEditReplyText] = useState('')

    function handleDeleteCommentReply() {
        const updatedList = commentReplies.filter((deletedReply:any) => {
            return deletedReply !== reply
        })
        setCommentReplies(updatedList)
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}/comment_replies/${reply.id}`, {
            method: 'DELETE',
        })
    }
    
    function handleEditReply(e:any) {
        e.preventDefault()
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}/comment_replies/${reply.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reply: editReplyText,
                edit: true
            })
        })
        .then(res => res.json())
        .then(edittedReply => {
            const updatedList = commentReplies.map((reply:any) => {
                if (reply.id === edittedReply.id) {
                    return {
                        ...reply,
                        reply: edittedReply.reply,
                        edit: edittedReply.edit
                    }
                } else {
                    return reply
                }
            })
            setCommentReplies(updatedList)
        })
    }

    return(
        <div>
            <img src={reply.who_commented_avatar_url} alt='oops!'></img>
            <h3>{reply.who_commented}</h3>
            <div>
                {reply.who_commented === loggedInUser.username || post.user_id === loggedInUser.id ? 
                <div>
                    <button onClick={handleDeleteCommentReply}>X</button> 
                </div>
                : null}
                {reply.who_commented === loggedInUser.username ? 
                <div>
                     
                    <button onClick={() => setIsEdit((isEdit) => !isEdit)}>Edit</button>
                </div>
                : null}
                {isEdit ? 
                <form onSubmit={handleEditReply}>
                    <input onChange={(e) => setEditReplyText(e.target.value)}></input>
                    <button>Add Edit</button>
                </form>
                : null}
                {reply.edit ? <div>Editted!</div> : null}
                {reply.reply}
            </div>
        </div>
    )
}

export default CommentReply
import { rmSync } from "fs"
import { useContext, useState } from "react"
import { CommentRepliesContext, LoggedInUserContext } from "./Context"


function  CommentReply({reply, comment, post}:any){

    const {commentReplies, setCommentReplies} = useContext(CommentRepliesContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const [isEdit, setIsEdit] = useState(false)
    const [editReplyText, setEditReplyText] = useState('')
    const [commentReplyLikes, setCommentReplyLikes] = useState(reply.comment_reply_likes)

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

    function handleReplyLike() {
        let isLiked = false 
        for (let i=0; i<commentReplyLikes.length; i++) {
            if (commentReplyLikes[i].who_liked === loggedInUser.username) {
                isLiked = true 
                const updatedList = commentReplyLikes.filter((like:any) => {
                    return like.id !== commentReplyLikes[i].id
                })
                setCommentReplyLikes(updatedList)
                fetch(`/users/${post.user.id}/posts/${post.id}/comments/${comment.id}/comment_replies/${reply.id}/comment_reply_likes/${commentReplyLikes[i].id}`, {
                    method:'DELETE'
                })
            }
        }
        if (isLiked === false) {
            fetch(`/users/${post.user.id}/posts/${post.id}/comments/${comment.id}/comment_replies/${reply.id}/comment_reply_likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    who_liked: loggedInUser.username,
                    who_liked_avatar_url: loggedInUser.avatar_url,
                    comment_reply_id: reply.id
                })
            })
            .then(res => res.json())
            .then(like => {
                const updatedList = [...commentReplyLikes, like]
                setCommentReplyLikes(updatedList)
            })
        }
    }

    return(
        <div>
            <img src={reply.who_commented_avatar_url} className='avatar-comment' alt='oops!'></img>
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
                <button onClick={handleReplyLike}>Like</button>
                {reply.edit ? <div>Editted!</div> : null}
                {reply.reply}
                {commentReplyLikes.length >= 2 ? <p>{`${commentReplyLikes[commentReplyLikes.length-1].who_liked} and ${commentReplyLikes.length} others liked this`}</p> : null }
                {commentReplyLikes.length === 1 ? <p>{`${commentReplyLikes[commentReplyLikes.length-1].who_liked} liked this`}</p> : null }
            </div>
        </div>
    )
}

export default CommentReply
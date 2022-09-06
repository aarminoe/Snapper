import { useContext } from "react"
import { CommentRepliesContext, LoggedInUserContext } from "./Context"


function  CommentReply({reply, comment, post}:any){

    const {commentReplies, setCommentReplies} = useContext(CommentRepliesContext)
    const {loggedInUser} = useContext(LoggedInUserContext)

    function handleDeleteCommentReply() {
        const updatedList = commentReplies.filter((deletedReply:any) => {
            return deletedReply !== reply
        })
        setCommentReplies(updatedList)
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}/comment_replies/${reply.id}`, {
            method: 'DELETE',
        })
    }
    console.log(reply)
    return(
        <div>
            <img src={reply.who_commented_avatar_url} alt='oops!'></img>
            <h3>{reply.who_commented}</h3>
            <div>
                {reply.who_commented === loggedInUser.username || post.user_id === loggedInUser.id ? <button onClick={handleDeleteCommentReply}>X</button> : null}
                {reply.reply}
            </div>
        </div>
    )
}

export default CommentReply
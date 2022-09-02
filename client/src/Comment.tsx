import CommentReply from "./CommentReply"



function Comment({comment}:any) {

    console.log(comment.comment_replies)
    return(
        <div>
            Comment
            {comment.comment_replies.map((reply:any) => {
                return <CommentReply reply={reply} />
            })}
        </div>
    )
}


export default Comment
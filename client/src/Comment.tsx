import CommentReply from "./CommentReply"



function Comment({comment}:any) {


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
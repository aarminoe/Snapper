


function  CommentReply({reply}:any){

    console.log(reply)
    return(
        <div>
            <img src={reply.who_commented_avatar_url} alt='oops!'></img>
            <h3>{reply.who_commented}</h3>
            {reply.reply}
        </div>
    )
}

export default CommentReply

import { rmSync } from "fs"
import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { CommentRepliesContext, LoggedInUserContext, ClickedUserContext, UserListContext } from "./Context"
import { AiFillEdit, AiFillLike } from 'react-icons/ai'
import { Button,Typography, Card } from '@mui/material'

interface ReplyProps{
    comment:string;
    comment_likes:any;
    comment_replies:any;
    date?:string;
    edit?:boolean;
    id:number;
    post_id:number;
    who_commented:string;
    who_commented_avatar_url:string
}

interface CommentProps {
    id:number;
    edit? : boolean;
    comment_replies: any;
    date:any;
    post_id:number
    who_commented: string;
    who_commented_avatar_url: string;
    comment_likes:any;
    comment:any;
}

interface LikeProps {
    comment: CommentProps;
    comment_id:number;
    id:number;
    who_liked:string;
    who_liked_avatar_url:string
}


function  CommentReply({reply, comment, post}:any){

    const {commentReplies, setCommentReplies} = useContext(CommentRepliesContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {setClickedUser} = useContext(ClickedUserContext)
    const {userList} = useContext(UserListContext)
    const [isEdit, setIsEdit] = useState(false)
    const [editReplyText, setEditReplyText] = useState('')
    const [commentReplyLikes, setCommentReplyLikes] = useState(reply.comment_reply_likes)

    function handleDeleteCommentReply() {
        const updatedList = commentReplies.filter((deletedReply:ReplyProps) => {
            return deletedReply !== reply
        })
        setCommentReplies(updatedList)
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}/comment_replies/${reply.id}`, {
            method: 'DELETE',
        })
    }
    
    function handleEditReply(e: { preventDefault: () => void; }) {
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
            const updatedList = commentReplies.map((reply:ReplyProps) => {
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
                const updatedList = commentReplyLikes.filter((like:LikeProps) => {
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

    function handleClickedUser(){
        console.log(reply)
        for (let i=0;i < userList.length;i++) {
            if (userList[i].username === reply.who_commented) {
                setClickedUser(userList[i])
                break
            }
        }
    }

    

    return(
        <div className="comment-reply">
            <div className="card">
                        <div className="comment-buttons">
                            {reply.who_commented === loggedInUser.username || post.user_id === loggedInUser.id ? 
                            <div>
                                <Button className="comment-delete" onClick={handleDeleteCommentReply}>X</Button> 
                            </div>
                            : null}
                            {reply.who_commented === loggedInUser.username ? 
                            <div>
                                <Button className="comment-edit" onClick={() => setIsEdit((isEdit) => !isEdit)}><AiFillEdit/></Button>
                            </div>
                            : null}
                            {isEdit ? 
                            <form onSubmit={handleEditReply}>
                                <input className='reply-edit' onChange={(e) => setEditReplyText(e.target.value)}></input>
                                <Button type='submit'>Add Edit</Button>
                            </form>
                            : null}
                            <Button className="comment-like-btn" onClick={handleReplyLike}><AiFillLike/></Button>
                        </div>
                <img src={reply.who_commented_avatar_url} className='avatar-comment' alt='oops!'></img>
                {loggedInUser.username === reply.who_commented ? <NavLink className='comment-user-reply' to={`/${loggedInUser.username}`}>{reply.who_commented}</NavLink>:
                <NavLink className='comment-user-reply' to='/other_user' onClick={handleClickedUser}>{reply.who_commented}</NavLink>}
                <div>
                    <div>
                        {reply.edit ? <div>Editted!</div> : null}
                    </div>
                    <p className="comment-reply-box">
                        <p className="card">
                            <p className="comment-reply-text">
                            {reply.reply}
                            </p>
                        </p>
                    </p> 
                    <p>{reply.date}</p>
                    {commentReplyLikes.length > 2 ? <p className="reply-liked-this">{`${commentReplyLikes[commentReplyLikes.length-1].who_liked} and ${commentReplyLikes.length} others liked this`}</p> : null }
                    {commentReplyLikes.length === 2 ? <p className="reply-liked-this">{`${commentReplyLikes[commentReplyLikes.length-1].who_liked} and ${commentReplyLikes.length-1} other liked this`}</p> : null }
                    {commentReplyLikes.length === 1 ? <p className="reply-liked-this">{`${commentReplyLikes[commentReplyLikes.length-1].who_liked} liked this`}</p> : null }
                </div>
            </div>
        </div>
    )
}

export default CommentReply
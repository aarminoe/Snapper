import CommentReply from "./CommentReply"
import React, { useContext, useState } from "react"
import { LoggedInUserContext, CommentsContext, CommentRepliesContext, UserListContext, ClickedUserContext } from "./Context"
import { NavLink } from "react-router-dom"
import { AiFillEdit, AiFillLike } from 'react-icons/ai'
import { BiCommentAdd } from 'react-icons/bi'

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

interface PostProps {
    id: number;
    edit?: boolean;
    image_url: string;
    title: string;
    user_id: number
    date? :string;
    comments:any;
    post_likes:any;
    tags:any;
    user:any;
}

type Props = CommentProps & PostProps

interface LikeProps {
    comment: CommentProps;
    comment_id:number;
    id:number;
    who_liked:string;
    who_liked_avatar_url:string
}

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


function Comment({comment, post}:any) {

    const [seeReplyComment, setSeeReplyComment] = useState(false)
    const [newReply, setNewReply] = useState('')
    const [commentReplies, setCommentReplies] = useState([...comment.comment_replies.reverse()])
    const [isEdit, setIsEdit] = useState(false)
    const [edittedCommentText, setEdittedCommentText] = useState('')
    const [commentLikes, setCommentLikes] = useState(comment.comment_likes)

    const {setClickedUser} = useContext(ClickedUserContext)
    const {userList} = useContext(UserListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {comments, setComments} = useContext(CommentsContext)

    console.log(comment)
    console.log(post)

    function handleCommentReply(e: { preventDefault: () => void }) {
        e.preventDefault()
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}/comment_replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reply: newReply,
                who_commented: loggedInUser.username,
                who_commented_avatar_url: loggedInUser.avatar_url,
                comment_id: comment.id
            })
        })
        .then(resp => resp.json())
        .then(reply => {
            console.log(reply)
            const updatedList = [...commentReplies.reverse(), reply]
            setCommentReplies(updatedList.reverse())
            setNewReply('')
        })
    }

    function handleEditComment(e: { preventDefault: () => void }) {
        e.preventDefault()
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: edittedCommentText,
                edit: true
            })
        })
        .then(res => res.json())
        .then(edittedComment => {
            const updatedList = comments.map((comment:any) => {
                if (comment.id === edittedComment.id) {
                    return {
                        ...comment,
                        comment: edittedComment.comment,
                        edit: edittedComment.edit
                    }
                } else {
                    return comment
                }
            })
            setComments(updatedList)
            setEdittedCommentText('')
        })
    }

    function handleDeleteComment() {
        console.log(comments)
        console.log(comment)
        const updatedList = comments.filter((deletedComment:CommentProps) => {
            console.log(deletedComment)
            return deletedComment !== comment
        })
        setComments(updatedList)
        fetch(`/users/${loggedInUser.id}/posts/${comment.post_id}/comments/${comment.id}`, {
            method: 'DELETE'
        })
    }

    function handleClickedUser(){
        console.log('comment')
        console.log(comment.who_commented)
        for (let i=0;i < userList.length;i++) {
            console.log(userList[i])
            if (userList[i].username === comment.who_commented && userList[i].username !== loggedInUser.username) {
                setClickedUser(userList[i])
                console.log(userList[i])
                break
            }
            
        }
    }

    function handleLikeComment() {
        let isLiked = false 
        for(let i=0;i<commentLikes.length;i++) {
            if (commentLikes[i].who_liked === loggedInUser.username) {
                isLiked = true
                const updatedList = commentLikes.filter((like:LikeProps) => {
                    return like.id !== commentLikes[i].id
                })
                setCommentLikes(updatedList)
                fetch(`/users/${post.user.id}/posts/${comment.post_id}/comments/${comment.id}/comment_likes/${commentLikes[i].id}`, {
                    method: 'DELETE'
                })
            }
        }
        if (isLiked === false) {
            fetch(`/users/${post.user.id}/posts/${comment.post_id}/comments/${comment.id}/comment_likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    who_liked: loggedInUser.username,
                    who_liked_avatar_url: loggedInUser.avatar_url,
                    comment_id: comment.id
                })
            })
            .then(res => res.json())
            .then(like => {
                console.log(like)
                const updatedList = [...commentLikes, like]
                setCommentLikes(updatedList)
            })
        }
    }
   
    console.log(commentReplies)
    return(
        <CommentRepliesContext.Provider value={{commentReplies, setCommentReplies}}>
            <div className="card">
                <div className="comment-buttons">
                    {comment.who_commented === loggedInUser.username || post.user_id === loggedInUser.id ? 
                    <div>
                        <button className="comment-delete" onClick={handleDeleteComment}>X</button>
                    </div>
                    : null}
                    {comment.who_commented === loggedInUser.username ? 
                    <div>
                        <button className="comment-edit" onClick={() => setIsEdit((isEdit) => !isEdit)}><AiFillEdit/></button>
                    </div>
                    : null}
                    <button className="comment-like-btn" onClick={handleLikeComment}><AiFillLike/></button>
                </div>
                    <img src={comment.who_commented_avatar_url} className='avatar-comment' alt='oops!'></img>
                {loggedInUser.username === comment.who_commented ? <NavLink className='comment-user' to={`/${loggedInUser.username}`}>{comment.who_commented}</NavLink>:
                <NavLink className='comment-user' to='/other_user' onClick={handleClickedUser}>{comment.who_commented}</NavLink>}
                {comment.edit === true ? <p>Editted</p> : null}
                {isEdit ? 
                <form onSubmit={handleEditComment}>
                    <input value={edittedCommentText} onChange={(e) => setEdittedCommentText(e.target.value)}></input> 
                    <button>Add Edit</button>
                </form>
                : null}
                <p className="comment-text-box">
                    <p className="card">
                        <p className="comment-text">{comment.comment}</p>
                    </p>
                </p>
                <p className="liked-this">
                    {commentLikes.length >= 2 ? <p>{`${commentLikes[commentLikes.length-1].who_liked} and ${commentLikes.length} others liked this`}</p> : null }
                    {commentLikes.length === 1 ? <p>{`${commentLikes[commentLikes.length-1].who_liked} liked this`}</p> : null }
                </p>
                <button className="comment-reply-btn" onClick={() => setSeeReplyComment((seeReplyComment) => !seeReplyComment)}>See replies</button>
                {seeReplyComment ? 
                <div>
                    <form onSubmit={handleCommentReply}>
                        <input type='text' value={newReply} onChange={(e) => setNewReply(e.target.value)}/> 
                        <button><BiCommentAdd/></button>
                    </form>
                    {commentReplies.map((reply:ReplyProps) => {
                    return <CommentReply reply={reply} comment={comment} post={post}/>
                })}
                </div>
                : null}
                

            </div>
        </CommentRepliesContext.Provider>
    )
}


export default Comment
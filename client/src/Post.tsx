import React, { useContext, useState, useEffect } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"
import { LoggedInUserContext, ClickedUserContext, PostsContext, CommentsContext, UserListContext, TagListContext } from "./Context"
import Comment from "./Comment"
import { NavLink } from "react-router-dom"
import { AiFillLike, AiFillEdit, AiFillTag } from 'react-icons/ai'
import { Button,Box, Card, CardContent, Typography } from '@mui/material'

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




function Post({post, url}:any) {

    const [newComment,setNewComment] = useState('')
    const [comments, setComments] = useState([...post.comments.reverse()])
    const [edit, setEdit] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [postLikes, setPostLikes] = useState(post.post_likes)
    const [seeComments, setSeeComments] = useState(false)
    const [tag, setTag] = useState('')
    const [postTags, setPostTags] = useState(post.tags)
    const [tagLimitReached, setTagLimitReached] = useState(false)


    const {setImageList, imageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts} = useContext(PostsContext)
    const {clickedUser, setClickedUser} = useContext(ClickedUserContext)
    const {userList} = useContext(UserListContext)
    const {tagList} =useContext(TagListContext)
    const imageListRef = ref(storage, 'images/')
    const imageRef = ref(storage, url)


    
    

    function handleDeletePost() {
        posts.forEach((post:PostProps) => {
            if (post.image_url === url && post.user_id === loggedInUser.id) {
                listAll(imageListRef)
                .then((resp) => resp.items.forEach((item) => {
                    console.log(item)
                    getDownloadURL(item)  
                    .then((url) => {
                        const updatedList = imageList.filter((img:any) => {
                            return img !== url
                        })
                        const updatedPosts = posts.filter((post:any) => {
                            return post.image_url !== url
                        })
                        setImageList(updatedList)
                        setPosts(updatedPosts)
                        console.log(imageList)
                        fetch(`/users/${loggedInUser.id}/posts/${post.id}`, {
                            method: 'DELETE'
                        })
                        deleteObject(imageRef)
                    })
                }            
            ))   
            }
        })  
    }

    function handleEditPost(e: { preventDefault: () => void }) {
        e.preventDefault()
        if (post.image_url === url && post.user_id === loggedInUser.id) {
            fetch(`/users/${loggedInUser.id}/posts/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editTitle,
                    edit: true
                })
            })
            .then(res => res.json())
            .then(edittedPost => {
                const updatedList = posts.map((post:any) => {
                    if (post.id === edittedPost.id) {
                        return {
                            ...post,
                            title: edittedPost.title,
                            edit: edittedPost.edit
                        }
                    } else {
                        return post
                    }
                })
                setPosts(updatedList)
                setEditTitle('')
            })
        }
    }

    function handleNewComment(e: { preventDefault: () => void }){
        e.preventDefault() 
        fetch(`/users/${loggedInUser.id}/posts/${post.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: newComment,
                who_commented: loggedInUser.username,
                who_commented_avatar_url: loggedInUser.avatar_url,
                post_id: post.id
            })
        })
        .then(resp => resp.json())
        .then(comment => {
            const updatedComments = [...comments.reverse(), comment]
            setComments(updatedComments.reverse())
            setNewComment('')
        })
    }
    
    function handlePostLike() {
        let isLiked = false
        for (let i=0;i<postLikes.length;i++) {
            if (postLikes[i].who_liked === loggedInUser.username) {
                isLiked = true
                const updatedList = postLikes.filter((like:any) => {
                    return like.id !== postLikes[i].id
                })
                setPostLikes(updatedList)
                fetch(`/users/${loggedInUser.id}/posts/${post.id}/post_likes/${postLikes[i].id}`, {
                    method: 'DELETE'
                })
            }
        }
        if (isLiked === false) {
            fetch(`/users/${loggedInUser.id}/posts/${post.id}/post_likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    who_liked: loggedInUser.username,
                    who_liked_avatar_url: loggedInUser.avatar_url,
                    post_id: post.id
                })
            })
            .then(res => res.json())
            .then(like => {
                console.log(like)
                const updatedList = [...postLikes, like]
                setPostLikes(updatedList)
            })
        }
    }

    function handleClickedUser(){
        for (let i=0;i < userList.length;i++) {
            if (userList[i].username === post.user.username) {
                setClickedUser(userList[i])
                break
            }
        }
    }
 

    function handleAddTag(e: { preventDefault: () => void }) {
        e.preventDefault()
        let isTag = false
        let existingTag
        for (let i=0;i<tagList.length;i++) {
            console.log(tagList[i])
            if (postTags.length <= 5 && tagList[i].tag_text !== tag) {
                isTag = false
                console.log('false')
            }
            else if (postTags.length <= 5 && tagList[i].tag_text === tag) {
                isTag = true
                existingTag = tagList[i]
                console.log(tagList[i])
                break
            }
            else {
                setTagLimitReached(true)
                setTag('')
            }
        }
        if (postTags.length <= 5 && isTag === false) {
            fetch('/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tag_text: tag
                })
            })
            .then(res => res.json())
            .then(newTag => {
                const updatedList = [...postTags, newTag]
                setPostTags(updatedList)
                setTag('')
                fetch('/post_tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_id: post.id,
                        tag_id: newTag.id
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
            })
        }     
        else {
            console.log(existingTag)
            let foundTag 
            let postHasTag = false
            for (let i=0;i<tagList.length;i++) {
                if (tagList[i] === existingTag) {
                    foundTag = tagList[i]
                }
            }
            for (let i=0;i<foundTag.posts.length;i++) {
                if (foundTag.posts[i].title === post.title) {
                    postHasTag = true
                    console.log(postHasTag)
                }
            }
            if (postHasTag !== true) {
                fetch(`/post_tags`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        post_id: post.id,
                        tag_id: existingTag.id
                    })
                })
                .then(res => res.json())
                .then(data => console.log(data))
            }  
        }
    }

    return(
        <CommentsContext.Provider value={{comments, setComments}}>
            <div style={{ padding:30 }}>
                <Card>
                    <CardContent>
                        {post.user_id === loggedInUser.id ? 
                        <Card className="post-btns">
                            <Button color='error' className="delete-post-btn" onClick={handleDeletePost}>X</Button> 
                            <Button color='info' className="edit-post-btn" onClick={() => setEdit((edit) => !edit)}><AiFillEdit/></Button>
                        </Card>
                        : null}  
                        <CardContent>
                            <img className='avatar-post'  src={post.user.avatar_url} alt='oops!'></img>
                        </CardContent>         
                        {loggedInUser.username === post.user.username ? 
                        <CardContent>
                            <NavLink className='username-link' to={`/${loggedInUser.username}`}>{post.user.username}</NavLink>
                        </CardContent>
                        :
                        <CardContent>
                            <NavLink className='username-link' to={`/other_user`} onClick={handleClickedUser}>{post.user.username}</NavLink>
                        </CardContent>
                        }
                    </CardContent>
                    <CardContent className="tags-post">
                        {postTags.slice(0,5).map((singleTag:any) => {
                            return <p className="tag-post">#{singleTag.tag_text}</p>
                        })}
                    </CardContent>
                    <CardContent>
                        <>
                            <img className="post-pic" src={url} alt='oops'/>
                        </>
                    </CardContent>
                    <CardContent className="post-details">
                        <CardContent>
                            {loggedInUser.id === post.user_id ? 
                            <CardContent>
                                <form className="tag-input" onSubmit={handleAddTag}> 
                                    <input value={tag} onChange={(e) => setTag(e.target.value)}></input>
                                    <Button type="submit"><AiFillTag/></Button>
                                </form> 
                                {tagLimitReached ? <p className="text-danger">Tag Limit Reached</p> :null}
                            </CardContent>
                            : null}
                            <Card>
                                
                            </Card>
                        <div className="like-and-title">
                            <Card className="like-post-card">
                                <Button color='success' className="like-btn" onClick={handlePostLike}><AiFillLike /></Button>

                            </Card>
                        <Typography variant="h3">
                            <p className="post-title">
                                {post.title}
                            </p>
                        </Typography>
                        </div>
                        <CardContent className="liked-this">
                            {postLikes.length > 2 ? <p>{`${postLikes[postLikes.length -1].who_liked} and ${postLikes.length -1} others liked this post`}</p> : null}
                            {postLikes.length === 2 ? <p>{`${postLikes[postLikes.length -1].who_liked} and ${postLikes.length -1} other liked this post`}</p> : null}
                            {postLikes.length === 1 ? <p>{`${postLikes[postLikes.length -1].who_liked} liked this post`}</p> : null}
                        </CardContent>
                        {post.edit === true ? <p className="editted">Editted</p> : null}
                        {edit ? <form className="post-edit-bar" onSubmit={handleEditPost}>
                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
                            <Button type='submit'>Edit</Button>
                        </form> : null} 
                        </CardContent>
                        <Button className="see-comments" onClick={() => setSeeComments((seeComments) => !seeComments)}>See Comments</Button>
                        {seeComments ? 
                        <CardContent>
                            Add Comment
                            <form onSubmit={handleNewComment}>
                                <input type='text' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                                <Button type='submit' className='add-comment-btn'>Add</Button>
                            </form>
                            <p>
                            {comments.map((comment:CommentProps) => {
                                return <Comment comment={comment} post={post}/>
                            })}
                            </p>    
                        </CardContent>
                        : null}
                    </CardContent>
                </Card>

            </div>
        </CommentsContext.Provider>
    )
}

export default Post
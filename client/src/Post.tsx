import React, { useContext, useState, useEffect } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"
import { LoggedInUserContext, ClickedUserContext, PostsContext, CommentsContext, UserListContext } from "./Context"
import Comment from "./Comment"
import { NavLink } from "react-router-dom"


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
    const [tagList, setTagList] = useState(null)

    const {setImageList, imageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts} = useContext(PostsContext)
    const {clickedUser, setClickedUser} = useContext(ClickedUserContext)
    const {userList} = useContext(UserListContext)
    const imageListRef = ref(storage, 'images/')
    const imageRef = ref(storage, url)


    
    useEffect(() => {
        fetch('/tags')
        .then(res => res.json())
        .then(tags => setTagList(tags))
    })

    function handleDeletePost() {
        posts.forEach((post:any) => {
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

    function handleEditPost(e:any) {
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

    function handleNewComment(e:any){
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
 

    function handleAddTag(e:any) {
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
        <div className="card">
            <div>
                {post.user_id === loggedInUser.id ? 
                <div>
                    <button onClick={handleDeletePost}>X</button> 
                    <button onClick={() => setEdit((edit) => !edit)}>Edit</button>
                </div>
                : null}           
            </div>
            <div>
                {postTags.slice(0,5).map((singleTag:any) => {
                    return <p>#{singleTag.tag_text}</p>
                })}
            </div>
            <img className="post-pic" src={url} alt='oops'/>
            <div className="post-details">
                <h1>
                    {loggedInUser.id === post.user_id ? 
                    <div>
                        <form onSubmit={handleAddTag}>
                            Add Tags 
                            <input value={tag} onChange={(e) => setTag(e.target.value)}></input>
                            <button>Add Tag</button>
                        </form> 
                        {tagLimitReached ? <p className="text-danger">Tag Limit Reached</p> :null}
                    </div>
                    : null}
                {post.title}
                <button onClick={handlePostLike}>like</button>
                {postLikes.length > 1 ? <p>{`${postLikes[postLikes.length -1].who_liked} and ${postLikes.length} others liked this post`}</p> : null}
                {postLikes.length === 1 ? <p>{`${postLikes[postLikes.length -1].who_liked} liked this post`}</p> : null}
                {post.edit === true ? <p>Editted POST!</p> : null}
                {edit ? <form onSubmit={handleEditPost}>
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
                    <button>Change Title</button>
                </form> : null} 
                </h1>
                <img className='avatar'  src={post.user.avatar_url} alt='oops!'></img>
                {loggedInUser.username === post.user.username ? <NavLink to={`/${loggedInUser.username}`}>{post.user.username}</NavLink>:
                <NavLink to={`/other_user`} onClick={handleClickedUser}>{post.user.username}</NavLink>}
                <button onClick={() => setSeeComments((seeComments) => !seeComments)}>See Comments</button>
                {seeComments ? 
                <div>
                    Add Comment
                    <form onSubmit={handleNewComment}>
                        <input type='text' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                        <button>Add</button>
                    </form>
                    <p>
                    {comments.map((comment:any) => {
                        return <Comment comment={comment} post={post}/>
                    })}
                    </p>    
                </div>
                 : null}
            </div>
        </div>
        </CommentsContext.Provider>
    )
}

export default Post
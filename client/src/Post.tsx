import React, { useContext, useState, useEffect } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext, CommentsContext } from "./Context"
import Comment from "./Comment"


function Post({post, url}:any) {

    const [newComment,setNewComment] = useState('')
    const [comments, setComments] = useState([...post.comments.reverse()])
    const [edit, setEdit] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [postLikes, setPostLikes] = useState(post.post_likes)
    const {setImageList, imageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts} = useContext(PostsContext)
    const imageListRef = ref(storage, 'images/')
    const imageRef = ref(storage, url)


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
                who_commented_avatar_url: loggedInUser.image_url,
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
    console.log(post)
    
    function handlePostLike() {
        console.log(post)
        let isLiked = false
        for (let i=0;i<postLikes.length;i++) {
            if (postLikes[i].who_liked === loggedInUser.username) {
                isLiked = true
                console.log('whoa there buddy')
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
            console.log('we doing it!')
            fetch(`/users/${loggedInUser.id}/posts/${post.id}/post_likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    who_liked: post.user.username,
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

    console.log(post)

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
            <img className="post-pic" src={url} alt='oops'/>
            <div className="post-details">
                <h1>
                {post.title}
                <button onClick={handlePostLike}>like</button>
                {postLikes.length > 1 ? <p>{`${postLikes[postLikes.length -1].who_liked} and ${postLikes.length} others liked this post`}</p> : null}
                {postLikes.length === 1 ? <p>{`${postLikes[postLikes.length -1].who_liked} liked this post`}</p> : null}
                {post.edit === true ? <p>Editted POST!</p> : null}
                {edit ? <form onSubmit={handleEditPost}>
                    <input onChange={(e) => setEditTitle(e.target.value)}></input>
                    <button>Change Title</button>
                </form> : null} 
                </h1>
                <img className='avatar'  src={post.user.avatar_url} alt='oops!'></img>
                <h2>{post.user.username}</h2>
                <div>
                    Add Comment
                    <form onSubmit={handleNewComment}>
                        <input type='text' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                        <button>Add</button>
                    </form>
                    
                </div>
                <p>
                    {comments.map((comment:any) => {
                        return <Comment comment={comment} post={post}/>
                    })}
                </p>
            </div>
        </div>
        </CommentsContext.Provider>
    )
}

export default Post
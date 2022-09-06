import React, { useContext, useState } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext, CommentsContext } from "./Context"
import Comment from "./Comment"


function Post({post, url}:any) {

    const [newComment,setNewComment] = useState('')
    const [comments, setComments] = useState([...post.comments.reverse()])
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
                    })
                    .then(() => deleteObject(imageRef))
                }            
            ))   
            }
        })  
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
        })
    }

    return(
        <CommentsContext.Provider value={{comments, setComments}}>
        <div className="card">
            <p>
                {post.user_id === loggedInUser.id ? <button onClick={handleDeletePost}>X</button> : null}           
            </p>
            <img className="post-pic" src={url} alt='oops'/>
            <div>
                <h1>
                {post.title}
                </h1>
                <img src={post.user.avatar_url} alt='oops!'></img>
                <h2>{post.user.username}</h2>
                <p>
                    Add Comment
                    <form onSubmit={handleNewComment}>
                        <input type='text' onChange={(e) => setNewComment(e.target.value)}></input>
                        <button>Add</button>
                    </form>
                    
                </p>
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
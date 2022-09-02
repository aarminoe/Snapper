import React, { useContext } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from "./Context"
import Comment from "./Comment"


function Post({post, url}:any) {

    const {setImageList, imageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {setLoggedInUserPosts} = useContext(LoggedInUserPostsContext)
    const {posts, setPosts} = useContext(PostsContext)
    const imageListRef = ref(storage, 'images/')
    const imageRef = ref(storage, url)
    
    console.log(post)
    function handleDeletePost() {
        console.log('h')
        console.log(url, 'post')
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

    return(
        <div className="card">
            <img className="post-pic" src={url} alt='oops'/>
            <div>
                <h1>
                {post.title}
                </h1>
                <p>
                    {post.comments.map((comment:any) => {
                        return <Comment comment={comment}/>
                    })}
                </p>
            </div>
            <button onClick={handleDeletePost} className='btn btn-primary'>Delete!</button>
        </div>
    )
}

export default Post
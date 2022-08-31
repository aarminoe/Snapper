import React, { useContext } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from "./Context"


function Post({url}:{url:string}) {

    const {setImageList, imageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {setLoggedInUserPosts} = useContext(LoggedInUserPostsContext)
    const {posts, setPosts} = useContext(PostsContext)
    const imageListRef = ref(storage, 'images/')
    const imageRef = ref(storage, url)
    
    console.log(url)
    function handleDeletePost() {
        console.log('h')
        console.log(url)
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
        <div >
            <img className="post-pic" src={url} alt='oops'/>
            <button onClick={handleDeletePost}>Delete!</button>
        </div>
    )
}

export default Post
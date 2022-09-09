import React, { useContext, useState, useEffect} from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ImageListContext, ImageUploadContext } from './Context'
import Post from "./Post"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from "./Context"



function Home() {

    const [title, setTitle] = useState('')

    const {imageUpload, setImageUpload} = useContext(ImageUploadContext)
    const {imageList, setImageList} = useContext(ImageListContext)
    const {loggedInUser, setLoggedInUser} = useContext(LoggedInUserContext)
    const {loggedInUserPosts, setLoggedInUserPosts} = useContext(LoggedInUserPostsContext)
    const {posts, setPosts} = useContext(PostsContext)
    
 

    function uploadImage(e:any) {
        e.preventDefault()
        console.log(imageUpload)
        if (imageUpload.name !== '') {
            console.log('Yes')
            const imageRef = ref(storage, `images/${imageUpload.name + loggedInUser.username}`)
            uploadBytes(imageRef, imageUpload)
            .then((snap) => {
                getDownloadURL(snap.ref).then((url) => {
                    fetch(`/users/${loggedInUser.id}/posts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: title,
                            image_url: url,
                            user_id: loggedInUser.id,
                            edit: false
                        })     
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        const updatedList = [...imageList, data.image_url]
                        setImageList(updatedList)
                        const updatedPosts = [...posts.reverse(), data]
                        setPosts(updatedPosts.reverse())
                        console.log(updatedPosts)
                    })
                })   
            })
        }
        else {
            console.log('NOOO')
        }

    }
      

    return(
        <div>
            Home
                <form>
                    <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
                    <button onClick={uploadImage}>upload</button>
                </form>
                    <p>
                        Set Description
                        <input type='text' onChange={(e) => setTitle(e.target.value)}></input>
                    </p>
            <div className="row">       
                {posts.map((post:any) => {
                return <Post post={post} url={post.image_url}/>
                })}    
            </div>      
        </div>
        
    )
}

export default Home
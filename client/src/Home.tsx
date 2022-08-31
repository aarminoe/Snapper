import React, { useContext, useState, useEffect} from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ImageListContext, ImageUploadContext } from './Context'
import Post from "./Post"
import { LoggedInUserContext } from "./Context"



function Home() {

    const {imageUpload, setImageUpload} = useContext(ImageUploadContext)
    const {imageList, setImageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
 

    function uploadImage() {
        console.log(imageUpload)
        if (imageUpload === null) return
        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload)
        .then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
                fetch(`/users/${loggedInUser.id}/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: 'test',
                        image_url: url,
                        user_id: loggedInUser.id
                    })     
                })
                .then(resp => resp.json())
                .then(data => console.log(data))
                setImageList((prev:any) => [...prev, url])
            })   
        })

    }
      

    return(
        <div>
            Home
                <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
                <button onClick={uploadImage}>upload</button>
            <div className="row">       
                {imageList.map((url:string) => {
                return <Post url={url} />
                })}    
            </div>      
        </div>
        
    )
}

export default Home
import React, { useContext, useState, useEffect} from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ImageListContext, ImageUploadContext } from './Context'
import Post from "./Post"




function Home() {

    const {imageUpload, setImageUpload} = useContext(ImageUploadContext)
    const {imageList, setImageList} = useContext(ImageListContext)
 

    function uploadImage() {
        console.log(imageUpload)
        if (imageUpload === null) return
        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload)
        .then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
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
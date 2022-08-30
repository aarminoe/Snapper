import React, { useContext } from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"


function Post({url}:{url:string}) {

    const {setImageList, imageList} = useContext(ImageListContext)
    const imageListRef = ref(storage, 'images/')
    const imageRef = ref(storage, url)
  
    function handleDeletePost() {
        deleteObject(imageRef)
    }

    return(
        <div className="col">
            <img className="post-pic" src={url} alt='oops'/>
            <button onClick={handleDeletePost}>Delete!</button>
        </div>
    )
}

export default Post
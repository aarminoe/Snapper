import React, { useContext, useState, useEffect} from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ImageListContext, ImageUploadContext } from './Context'
import Post from "./Post"
import { TrueButtonContext } from './Context'



function Home() {

    const {imageUpload, setImageUpload} = useContext(ImageUploadContext)
    const {imageList, setImageList} = useContext(ImageListContext)
 
    const [isButton, setIsButton] = useState(false)

    const imageListRef = ref(storage, 'images/')

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
      
    useEffect(() => {
        listAll(imageListRef)
        .then((resp) => resp.items.forEach((item) => {
          getDownloadURL(item)
          .then((url) => {
            setImageList((prev:string[]) => [...prev, url])
          })
        }))
    }, [])

    const images = imageList.map((url:string) => {
        
        return <img src={url} alt='Oops!'/>
    })

    return(
        <TrueButtonContext.Provider value={{isButton, setIsButton}}>
            Home
                <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
                <button onClick={uploadImage}>upload</button>
            {imageList.map((url:string) => {
            return <Post url={url} />
            })}      
        </TrueButtonContext.Provider>
        
    )
}

export default Home
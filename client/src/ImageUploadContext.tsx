import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import React, { useContext, useState, useEffect, ReactNode, createContext} from 'react'


interface Props {
    children?: ReactNode
}

const ImageListContext = React.createContext({})
const ImageUploadContext = React.createContext({})    

export function useImageList() {
    return useContext(ImageListContext)
}

export function useImageUpload() {
    return useContext(ImageUploadContext)
}
export function ImageUploadProvider ({ children, ...props }: Props) {
    const [imageUpload, setImageUpload] = useState<any>({name: ''})
    const [imageList, setImageList] = useState<string[]>([])    

    const imageListRef = ref(storage, 'images/')

    function uploadImage() {
        console.log('hi')
        if (imageUpload === null) return
        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload)
        .then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
                setImageList((prev) => [...prev, url])
            })
            
        })
      }
      
      useEffect(() => {
        listAll(imageListRef)
        .then((resp) => resp.items.forEach((item) => {
          getDownloadURL(item)
          .then((url) => {
            setImageList((prev) => [...prev, url])
          })
        }))
      }, [])


    return (
        // <ImageListContext.Provider value={{imageList, setImageList}}>
        //     <ImageUploadContext.Provider value={{imageUpload, setImageUpload}}>
        //         {children}
        //         <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
        //         <button onClick={uploadImage}>upload</button>
        //         {imageList.map((url) => {
        //             return <img src={url} alt='Oops!'/>
        //         })}     
        //     </ImageUploadContext.Provider>       
        // </ImageListContext.Provider>
        <div>hgi</div>
    )
}
import { useContext } from "react"
import { LoggedInUserContext } from "./Context"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { ImageListContext } from "./Context"




function UserPosts({url}:{url:string}) {

    // const {loggedInUser} = useContext(LoggedInUserContext)
    // const {imageList, setImageList} = useContext(ImageListContext)
    // const imageListRef = ref(storage, 'images/')
    // const imageRef = ref(storage, url)

    // function handleDeletePost() {
    //     loggedInUser.posts.forEach((post:any) => {
    //         if (post.image_url === url) {
    //             console.log(imageRef)
    //             console.log(imageList)
    //             listAll(imageListRef)
    //             .then((resp) => resp.items.forEach((item) => {
    //                 console.log(item)
    //                 getDownloadURL(item)  
    //                 .then((url) => {
    //                     console.log(url)
    //                     setImageList((prev:string[]) => prev.filter((img) => {
    //                         return img !== url
    //                     }))
    //                 })
    //                 .then(() => deleteObject(imageRef))
    //             }
                
    //         ))
        
    //         }
    //     })
        
    // }

    return(
        <div className="col">
            <img className="post-pic" src={url} alt='oops'/>
            <button >Delete!</button>
        </div>
    )
}

export default UserPosts
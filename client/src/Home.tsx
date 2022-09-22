import React, { useContext, useState, useEffect, SetStateAction} from "react"
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { ImageListContext, ImageUploadContext } from './Context'
import Post from "./Post"
import { LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from "./Context"
import { AiOutlineUpload } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { Button,Input, Card, Typography } from '@mui/material'

interface PostProps {
    comments: any;
    edit:boolean;
    id:number;
    image_url:string;
    post_likes:any;
    tags:any;
    title:string;
    user:any;
    user_id:number
}
interface LoggedInUserProps {
    id: number;
    username: string;
    avatar_url: string;
    bio: string;
    conversations:any[];
    followers: any[];
    follows:any[]
    posts:any[]
  }


function Home() {

    const [title, setTitle] = useState('')
    const [homePosts,setHomePosts] = useState(null)
    const [seeFriendsPosts, setSeeFriendsPosts] = useState(false)

    const {imageUpload, setImageUpload} = useContext(ImageUploadContext)
    const {imageList, setImageList} = useContext(ImageListContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    const {posts, setPosts}= useContext(PostsContext)

    console.log(loggedInUser)

    useEffect(() => {
        let homePostList:PostProps[] = []
        fetch('/posts')
        .then(res => res.json())
        .then(postList => {
            for (let i=0;i<postList.length;i++) {
                for (let j=0;j<loggedInUser.follows.length;j++) {
                    if (postList[i].user.username === loggedInUser.follows[j].followed) {
                        console.log('got one')
                        homePostList.push(postList[i])
                    }
                }
            }
            
        })
        console.log(homePostList)
        setHomePosts(homePostList.reverse())
    },[])

    function uploadImage(e: { preventDefault: () => void }) {
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
                        setTitle('')
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
            <Card>
                <form>
                    <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
                    <Button className="upload-btn" onClick={uploadImage}><AiOutlineUpload /></Button>
                </form>
                    <p>
                        <Typography  variant='h6'>
                            Description:
                        <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                        </Typography>
                    </p>
            </Card>
                    {seeFriendsPosts ? <Button className="see-posts-btn" onClick={() => setSeeFriendsPosts((seeFriendsPosts) => !seeFriendsPosts)}><FaUserFriends/></Button> :
                    <Button className="see-posts-btn" onClick={() => setSeeFriendsPosts((seeFriendsPosts) => !seeFriendsPosts)}><HiUserGroup/></Button> }
                
            <div className="post-card">       
                {seeFriendsPosts ? homePosts.map((post:PostProps) => {
                return <Post post={post} url={post.image_url}/>
                }): posts.map((post:PostProps) => {
                return <Post post={post} url={post.image_url}/>
                }) }  
            </div>      
        </div>
        
    )
}

export default Home
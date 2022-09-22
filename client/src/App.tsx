
import './index.css'
import React, { useState, useEffect, ReactNode} from 'react'
import { ConversationsContext, ImageListContext, ImageUploadContext, LoggedInUserContext, LoggedInUserPostsContext, PostsContext, UserListContext, SearchedUserContext, ClickedUserContext, LoggedInUserConversationsContext, TagListContext } from './Context'
import { Route, Routes } from "react-router-dom"
import Home from './Home';
import NavBar from './NavBar';

import Signup from './Signup';
import UserProfile from './UserProfile';
import Search from './Search';
import Followers from './Followers';
import Messages from './Messages';
import Following from './Following';
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import Login from './Login';
import OtherUserProfile from './OtherUserProfile';


interface LoggedInUserProps {
  id: number;
  username: string;
  avatar_url: string;
  bio: string;
  conversations:any;
  followers: any;
  follows:any
  posts:any
}

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



function App(){

  const imageListRef = ref(storage, 'images/')

  const [imageUpload, setImageUpload] = useState<any>({name: ''})
  const [imageList, setImageList] = useState<string[]>([])    
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUserProps | null>(null)
  const [userList, setUserList] = useState([])
  const [loggedInUserPosts, setLoggedInUserPosts] = useState([])
  const [posts, setPosts] = useState<any>([])
  const [conversations, setConversations] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [clickedUser, setClickedUser] = useState(null)
  const [tagList, setTagList] = useState(null)

  useEffect(() => {
    fetch('/users')
    .then(resp => resp.json())
    .then(data => setUserList(data))
  }, [])

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if(res.ok){
        res.json().then(user => setLoggedInUser(user))
      }
    })
    .then()
  }, [])

  useEffect(() => {      
        listAll(imageListRef)
        .then((resp) => resp.items.forEach((item) => {
          getDownloadURL(item)  
          .then((url) => {
            setImageList((prev:string[]) => [...prev, url])
          })
        }))
  }, [])

  useEffect(() => {
    fetch('/posts')
    .then(res => res.json())
    .then(posts => {
      if (posts) {
        setPosts(posts.reverse())

      }
    }
    )
  }, [])

  useEffect(() => {
    fetch('/tags')
    .then(res => res.json())
    .then(tags => setTagList(tags))
}, [])

  useEffect(() => {
    fetch('/conversations')
    .then(res => res.json())
    .then(conversations => {
        setConversations(conversations.reverse())}
      )
  }, [])
  

  return (
    <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <PostsContext.Provider value={{posts, setPosts}}>
        <UserListContext.Provider value={{userList, setUserList}}>
          <SearchedUserContext.Provider value={{searchText, setSearchText}}>
            <ClickedUserContext.Provider value={{clickedUser, setClickedUser}}>
              <TagListContext.Provider value={{tagList, setTagList}}>
      <div className="container-fluid">
        {loggedInUser? 
        <div>
          <header>
            <NavBar />
          </header>
          <ImageListContext.Provider value={{imageList, setImageList}}>
            <Routes>
                <Route path='/' element={
                    <ImageUploadContext.Provider value={{imageUpload, setImageUpload}}>
                      <LoggedInUserPostsContext.Provider value={{loggedInUserPosts, setLoggedInUserPosts}}>
                        <Home />
                      </LoggedInUserPostsContext.Provider> 
                    </ImageUploadContext.Provider>       
                }/>
                <Route path={`/${loggedInUser.username}`} element={
                  <LoggedInUserPostsContext.Provider value={{loggedInUserPosts, setLoggedInUserPosts}}>
                    <ConversationsContext.Provider value={{conversations, setConversations}}>
                      <UserProfile />
                    </ConversationsContext.Provider>
                  </LoggedInUserPostsContext.Provider>}>
                      <Route element={<UserProfile/>}/>
                      <Route
                      path={`followers`}
                      element={<Followers />}/>
                      <Route
                      path={`following`}
                      element={<Following />}/> 
                      <Route
                      path={`messages`}
                      element={<Messages />}/>          
                </Route>          
                <Route path='/search' element={
                  <Search />
                }>
                  
                </Route>
                <Route
                  path={`/other_user`}
                  element={
                      <OtherUserProfile/>}/>    
            </Routes> 
          </ImageListContext.Provider>
        </div> :
        <div>
          <Login />
          or
          <Signup />
        </div>
        }
      </div>
              </TagListContext.Provider>
            </ClickedUserContext.Provider>
          </SearchedUserContext.Provider>
        </UserListContext.Provider>
      </PostsContext.Provider>
    </LoggedInUserContext.Provider>
  );
}

export default App;

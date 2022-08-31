
import './index.css'
import React, { useState, useEffect, ReactNode} from 'react'
import { ImageListContext, ImageUploadContext, LoggedInUserContext, LoggedInUserPostsContext, PostsContext } from './Context'
import { Route, Routes } from "react-router-dom"
import Home from './Home';
import NavBar from './NavBar';
import Header from './Header';
import Signup from './Signup';
import UserProfile from './UserProfile';
import Search from './Search';
import Followers from './Followers';
import Messages from './Messages';
import Notifications from './Notifications';
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import Login from './Login';


function App(){

  const imageListRef = ref(storage, 'images/')

  const [imageUpload, setImageUpload] = useState<any>({name: ''})
  const [imageList, setImageList] = useState<string[]>([])    
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [userList, setUserList] = useState([])
  const [loggedInUserPosts, setLoggedInUserPosts] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/users')
    .then(resp => resp.json())
    .then(data => console.log(data))
  }, [])

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if(res.ok){
        res.json().then(user => setLoggedInUser(user))
      }
    })
  }, [])

  useEffect(() => {      
        listAll(imageListRef)
        .then((resp) => resp.items.forEach((item) => {
          console.log(resp.items)
          getDownloadURL(item)  
          .then((url) => {
            setImageList((prev:string[]) => [...prev, url])
          })
        }))
  }, [])

  useEffect(() => {
    fetch('/posts')
    .then(res => res.json())
    .then(posts => setPosts(posts.reverse()))
 
  }, [])


  console.log(loggedInUser)

  return (
    
    <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <PostsContext.Provider value={{posts, setPosts}}>
      <div className="container-fluid">
        {loggedInUser? 
        <div>
          <header>
            <Header />
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
                  <UserProfile 
                  />
                  </LoggedInUserPostsContext.Provider>}>
                    <Route element={<UserProfile/>}/>
                    <Route
                    path={`followers`}
                    element={<Followers />}/>
                    <Route
                    path={`messages`}
                    element={<Messages />}/>
                    <Route
                    path={`notfications`}
                    element={<Notifications />}/>
                  
                </Route>

                <Route path={`/${loggedInUser.username}/notfications`}
                  element={<Notifications />}/>
                <Route path={`/${loggedInUser.username}/messages`}
                  element={<Messages />}/>
                  
                <Route path='/search' element={
                  <Search />
                }/>
                  
            </Routes>
          </ImageListContext.Provider>
        </div> :
        <Login />
        }
      </div>
      </PostsContext.Provider>
    </LoggedInUserContext.Provider>
  );
}

export default App;

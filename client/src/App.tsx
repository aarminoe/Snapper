
import './index.css'
import React, { useState, useEffect, ReactNode} from 'react'
import { ImageListContext, ImageUploadContext, LoggedInUserContext } from './Context'
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

  console.log(loggedInUser)

  return (
    
    <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <div className="container-fluid">
        {loggedInUser? 
        <div>
          <header>
            <Header />
            <NavBar />
          </header>
          <div>
            <Routes>
                <Route path='/' element={
                  <ImageListContext.Provider value={{imageList, setImageList}}>
                    <ImageUploadContext.Provider value={{imageUpload, setImageUpload}}>
                      <Home />
                        
                    </ImageUploadContext.Provider>       
                  </ImageListContext.Provider>
                }/>
                <Route path={`/${loggedInUser.username}`} element={
                  <UserProfile 
                  />}>
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
          </div>
        </div> :
        <Login />
        }
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default App;

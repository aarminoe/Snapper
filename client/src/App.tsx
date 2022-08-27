
import './index.css'
import React, { useState, useEffect, ReactNode} from 'react'
import { ImageListContext, ImageUploadContext, LoggedInUserContext } from './Context'
import { Route, Routes } from "react-router-dom"
import Home from './Home';
import NavBar from './NavBar';
import Header from './Header';
import Signup from './Signup';
import UserProfile from './UserProfile';



function App(){


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

  console.log(loggedInUser)

  return (
    
    <LoggedInUserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <div className="App">
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
                <Route path='/my-profile' element={
                  <UserProfile />
                }/>
            </Routes>
          </div>
        </div> :
        <Signup />
        }
      </div>
    </LoggedInUserContext.Provider>
  );
}

export default App;

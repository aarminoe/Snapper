
import './index.css'
import React, { useState, useEffect, ReactNode} from 'react'
import { ImageListContext, ImageUploadContext, LoggedInContext } from './Context'
import { Route, Routes } from "react-router-dom"
import Home from './Home';
import NavBar from './NavBar';
import Header from './Header';
import Signup from './Signup';



function App(){

  const [imageUpload, setImageUpload] = useState<any>({name: ''})
  const [imageList, setImageList] = useState<string[]>([])    
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('/users')
    .then(resp => resp.json())
    .then(data => console.log(data))
  }, [])

  return (
    
    <LoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <div className="App">
        {isLoggedIn? 
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
              }
                />
            </Routes>
          </div>
        </div> :
        <Signup />
        }
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;

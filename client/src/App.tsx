
import './index.css'
import React, { useState, ReactNode} from 'react'
import { ImageListContext, ImageUploadContext, LoggedInContext } from './Context'
import { Route, Routes } from "react-router-dom"
import Home from './Home';
import NavBar from './NavBar';
import Header from './Header';
import Login from './Login'


function App(){

  const [imageUpload, setImageUpload] = useState<any>({name: ''})
  const [imageList, setImageList] = useState<string[]>([])    
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
        <Login />
        }
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;

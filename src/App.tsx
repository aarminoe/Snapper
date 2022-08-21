
import './index.css'
import Home from './Home';
import { Route, Routes } from "react-router-dom"
import NavBar from './NavBar';
import Header from './Header';
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import React, { useContext, useState, useEffect, ReactNode, createContext} from 'react'



interface Props {
    children?: ReactNode
}

export const ImageListContext = React.createContext(null)
export const ImageUploadContext = React.createContext(null)    

export function useImageList() {
    return useContext(ImageListContext)
}

export function useImageUpload() {
    return useContext(ImageUploadContext)
}


function App(){

  const [imageUpload, setImageUpload] = useState<any>({name: ''})
  const [imageList, setImageList] = useState<string[]>([])    

  return (
    
    <div className="App">
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
      
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './index.css'
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import Home from './Home';
import { Route, Routes } from "react-router-dom"
import NavBar from './NavBar';




function App() {

  const [imageUpload, setImageUpload] = useState<any>({name: ''})
  const [imageList, setImageList] = useState<string[]>([])

  const imageListRef = ref(storage, 'images/')

  function uploadImage() {
    console.log('hi')
    if (imageUpload === null) return
    const imageRef = ref(storage, `images/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload)
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
    <div className="App">
      <header>
        <NavBar />
      </header>
        <Routes>
          <Route>
            <Home />
          </Route>
        </Routes>
      <input type='file' onChange={(e) => setImageUpload(e.target.files[0])}/>
      <button onClick={uploadImage}>upload</button>
      {imageList.map((url) => {
        return <img src={url} alt='Oops!'/>
      })}
    </div>
  );
}

export default App;

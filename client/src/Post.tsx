import React, { useContext } from "react"
import {TrueButtonContext} from './Context'

function Post({url}:{url:string}) {
  

    const {isButton, setIsButton} = useContext(TrueButtonContext)

    function handleButton() {
        setIsButton(!isButton)
    }
    return(
        <div>
            <img src={url} alt='oops'/>
            <button onClick={handleButton}>here</button>
            {isButton ? <div>true</div> : <div>false</div>}
        </div>
    )
}

export default Post
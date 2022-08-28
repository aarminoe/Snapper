import React, { useContext } from "react"


function Post({url}:{url:string}) {
  


    return(
        <div>
            <img className="post-pic" src={url} alt='oops'/>
            <button>here</button>
        </div>
    )
}

export default Post
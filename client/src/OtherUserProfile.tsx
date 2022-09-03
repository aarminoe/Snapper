import React, { useContext } from "react"
import { PostsContext, ClickedUserContext } from "./Context"
import Post from "./Post"


function OtherUserProfile() {

    const {posts} = useContext(PostsContext)
    const {clickedUser} = useContext(ClickedUserContext)

    console.log(clickedUser)

    return(
        <div>
            <div>
                {posts.map((post:any) => {
                    if (post.user_id === clickedUser.id) {
                        return <Post url={post.image_url} post={post}/>
                    }         
                })}
            </div>
        </div>
    )
}

export default OtherUserProfile
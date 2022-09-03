import React, { useContext, useState } from "react"
import { PostsContext, ClickedUserContext, LoggedInUserContext, ClickedUserFollowers } from "./Context"
import Post from "./Post"


function OtherUserProfile() {

    
    const {posts} = useContext(PostsContext)
    const {clickedUser} = useContext(ClickedUserContext)
    const {loggedInUser} = useContext(LoggedInUserContext)
    
    const [seeFollowers, setSeeFollowers] = useState(false)
    const [usersFollowers, setUsersFollowers] = useState(clickedUser.followers)

    function handleSeeFollowers() {
        setSeeFollowers((seeFollowers) => !seeFollowers)
    }

    function handleFollowUser() {
        if (clickedUser.username !== loggedInUser.username) {
            let hasFollowed = false
            for (let i=0;i<clickedUser.followers.length;i++) {
                console.log('hdsadsa')
                if (clickedUser.followers[i].who_followed === loggedInUser.username) {
                    hasFollowed = true
                    console.log('already followed')
                }
                else if (hasFollowed === false && i === clickedUser.followers.length -1) {
                    console.log('not followed yet!')
                    fetch(`/users/${clickedUser.id}/followers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            who_followed: loggedInUser.username,
                            who_followed_avatar_url: loggedInUser.image_url,
                            user_id: clickedUser.id
                        })
                    })
                    .then(res => res.json())
                    .then(follower => {
                        const updatedList = [...usersFollowers, follower]
                        setUsersFollowers(updatedList)
                    })
                }
            }    
        }
    }


    return(
        <div>
            {clickedUser.username}
            <div>
                <button onClick={handleSeeFollowers}>See Followers</button>
                <div>
                    <button onClick={handleFollowUser}>Follow!</button>
                </div>
            </div>
            {seeFollowers ? <p>{usersFollowers.map((follower:any) => {
                return(
                    <div>
                        follower
                        {follower.who_followed}
                    </div>
                )
            })}</p> : null}
            <div>
                {posts.map((post:any) => {
                    if (post.user_id === clickedUser.id) {
                        return (
                        <ClickedUserFollowers.Provider value={{usersFollowers, setUsersFollowers}}>
                            <Post url={post.image_url} post={post}/>
                        </ClickedUserFollowers.Provider>
                        )
                    }         
                })}
            </div>
        </div>
    )
}

export default OtherUserProfile
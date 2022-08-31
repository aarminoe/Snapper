


function UserPosts({url}:{url:string}) {

    return(
        <div className="col">
            <img className="post-pic" src={url} alt='oops'/>
            <button >Delete!</button>
        </div>
    )
}

export default UserPosts
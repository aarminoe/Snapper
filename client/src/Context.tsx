import { create } from "domain";
import { createContext } from "react";

export const ImageListContext = createContext(null)
export const ImageUploadContext = createContext(null)  
export const LoggedInUserContext = createContext(null)
export const LoggedInUserPostsContext = createContext(null)
export const PostsContext = createContext(null)
export const ConversationsContext = createContext(null)
export const CommentsContext = createContext(null)
export const UserListContext = createContext(null)
export const SearchedUserContext = createContext(null)
export const ClickedUserContext = createContext(null)
export const ClickedUserFollowers = createContext(null)
export const CommentRepliesContext = createContext(null)
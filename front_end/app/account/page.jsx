"use client"
import React,{useState} from 'react'
import SideBar from '../components/adminSidebar'
import Post from '../components/Post'


const Admin = () => {
    const [showPost, setShowPost] = useState(false)
    const handleShowPost = () => {
        setShowPost(true)
    }
  return (
    <div>

    <SideBar onAddPost={handleShowPost}/>

    <div className="p-4">
        {showPost && <Post/>}
    </div>
    </div>
)
}

export default Admin
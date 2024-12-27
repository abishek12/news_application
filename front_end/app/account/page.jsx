"use client"
import React,{useState} from 'react'
import SideBar from './components/sideBar'
// import Post from '../components/Post'


const Admin = () => {
    const [showPost, setShowPost] = useState(false)
    const handleShowPost = () => {
        setShowPost(true)
    }
  return (
    <div className=' h-screen'>

    {/* <SideBar onAddPost={handleShowPost} /> */}

    {/* <div className="flex-1 overflow-y-auto p-4 m-2">
        {showPost && <Post/>}
    </div> */}
    </div>
)
}

export default Admin
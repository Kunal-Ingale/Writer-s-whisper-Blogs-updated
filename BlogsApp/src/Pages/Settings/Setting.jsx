  import React, { useContext } from 'react'
  import './setting.css'
  import { Context } from '../../Context/Context'
  import { useState } from 'react'
  import axios from 'axios'
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;



  function Setting() {
    const[file,setFile] = useState(null)
    const[username,setUsername] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState(" ")
    const[success,setSuccess] = useState(false)
    const {user,dispatch} = useContext(Context)
    


    const publicFolder = 'https://writer-s-whisper-blogs.vercel.app/images/'  

    const handleUpdate = async (e)=>{
      e.preventDefault();
      dispatch({type:"UPDATE_START"})
      const updatedUser ={
      userId:user._id,
      username,
      email,password
      }
      //for storing data
      if(file){
      const data = new FormData();
      const fileName = Date.now()+ file.name;
      data.append("name",fileName);
      data.append("file",file);
      updatedUser.profilePic = fileName;
      
      try {
        await axios.post(`${apiBaseUrl}/upload`,data)
      } catch (error) {
        console.log("Error uploading file:", error);
      }
      }
      try{
      const res = await axios.put(`${apiBaseUrl}/users` + user._id,updatedUser)
      setSuccess(true)
      dispatch({type:"UPDATE_SUCCESS" , payload:res.data})
    }
      catch(err){
        dispatch({type:"UPDATE_FAILURE"})
      }
    
    }

    return (
      <div className='setting'>
        <div className="settingWrapper">
          <div className="settingTitle">
            <span className="settingUpdateTitle">Update Account Details</span>
            
          </div>
          <span style={{color:'red'}}>Note: You have to fill all the details before updating </span>
          <form className='settingForm' onSubmit={handleUpdate} >
            <label >Profile Picture</label>
            <div className='settingPP'>
              <img 
              src={file ? URL.createObjectURL(file) : publicFolder +user.profilePic} alt="" />
            
              <label htmlFor="fileInput">
              <i className="settingPPIcon fa-solid fa-user"></i>
              </label>
              <input 
              type="file" 
              id="fileInput" 
              style={{display:"none"}} 
              onChange={(e)=> setFile(e.target.files[0])}/>
            </div>
            
            <label >Username</label>
            <input type="text" placeholder={user.username} 
            onChange={(e)=>setUsername(e.target.value)}/>
            <label >Email</label>
            <input type="text" placeholder={user.email} 
            onChange={(e)=> setEmail(e.target.value)}/>
            <label >Password</label>
            <input type="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <button className="settingSubmit" type='submit' onClick={handleUpdate}>Update</button>
            {success && <span style={{color: 'green',textAlign:'centre'}}>Profile has been updated Successfully!</span>}
          </form>
        </div>
      </div>
    )
  }

  export default Setting

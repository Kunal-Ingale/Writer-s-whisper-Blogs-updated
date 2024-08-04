import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post('/api/auth/register',{
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    }
    
    catch (error) {
      setError(true);
    }
    
  }

  return (
    <div className='register'>
        <span className='registerTitle'>Register</span>
        
        <form className="registerForm" onSubmit={handleSubmit}>
        
         <label>Username</label>
         <input className="registerInput" type="text" placeholder="Enter your username..." 
         onChange={e=>setUsername(e.target.value)}
         />
        
         <label>Email</label>
         <input className="registerInput" type="text" placeholder="Enter your email..." 
         onChange={e=>setEmail(e.target.value)}/>
        
         <label>Password</label>
         <input className="registerInput" type="password" placeholder="Enter your password..." 
          onChange={e=>setPassword(e.target.value)}/>
         <button className="registerButton" type='submit'>Register</button>
         <br /> <br /><br />
         <p className='para'>Already have an account? Login here</p>
         <button className="registerLoginButton">
        <Link to='/login'  className='link'>Login</Link>
      </button>
      </form>
      
      {/* <button className="registerLoginButton">
        <Link to='/login'  className='link'>Login</Link>
      </button> */}
      {error && <span style={{color:"red", marginTop:"5px"}}>Something went Wrong!</span>}
    </div>
  )
}

export default Register

import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import api from '../../../utils/api';

function Login() {
  const userRef = useRef()
  const passRef= useRef()
  const {dispatch,isFetching} = useContext(Context)
  
  const handleSubmit= async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
      const res = await api.post(`${apiBaseUrl}/auth/login`,{
       username:userRef.current.value,
       password:passRef.current.value
      })
      dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})

      console.error("Login error:",error);
    }
   }
  

  return (
    <div className="login">
       <span className="loginTitle">Login</span>
      <form  className="loginForm" onSubmit={handleSubmit}>
        <label >Username</label>
        <input type="text" className='loginInput' 
        placeholder='username'
        ref={userRef}
        />
        <label >Password</label>
        <input type="password" className='loginInput'
        placeholder='password'
        ref={passRef}/>

        <button className='loginButton' type='submit' disabled={isFetching}
        onClick={handleSubmit}>Login</button>
        <button className="registerButton">
        <Link to='/register'  className='link'>Register
        </Link>
      </button>
      </form>
      
    </div>
  )
}

export default Login

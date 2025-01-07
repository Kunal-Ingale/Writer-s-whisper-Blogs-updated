import React, { useContext, useRef } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import api from '../../../utils/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching, error } = useContext(Context);  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = userRef.current.value;
    const password = passRef.current.value;
  
    if (!username || !password) {
      alert('Please fill in both username and password');
      return;
    }
  
    dispatch({ type: "LOGIN_START" });
  
    try {
      const res = await api.post(`${apiBaseUrl}/api/auth/login`, {
        username,
        password,
      });
  
      
      localStorage.setItem('token', res.data.token); 
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
    console.log(res.data);
    
      navigate('/'); 
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className='loginInput'
          placeholder='username'
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className='loginInput'
          placeholder='password'
          ref={passRef}
        />
        <button 
          className='loginButton' 
          type='submit' 
          disabled={isFetching}>
          {isFetching ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">Login failed. Please try again.</p>} 
        <button className="registerButton" disabled={isFetching}> 
          <Link to='/register' className='link'>Register</Link>
        </button>
      </form>
    </div>
  );
}

export default Login;

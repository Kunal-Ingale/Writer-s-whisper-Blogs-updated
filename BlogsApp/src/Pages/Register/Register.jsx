import React, { useState, useContext } from 'react';
import './register.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import { Context } from '../../Context/Context';
import api from '../../../utils/api'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`${apiBaseUrl}/api/auth/register`, {
        username,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token); // Save JWT token
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
      navigate('/login')
    } catch (error) {
      console.error("Registration error:", error);
    }
   
  };

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className='registerInput'
          type='text'
          placeholder='Enter your username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className='registerInput'
          type='text'
          placeholder='Enter your email..'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className='registerInput'
          type='password'
          placeholder='Enter your password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='registerButton' type='submit'>Register</button>
        <button className='registerLoginButton'>
          <Link to='/login' className='link'>Login</Link>
        </button>
      </form>
    </div>
  );
}

export default Register;

import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className='headerTitleSm'>Write & Publish Blogs</span> 
        
      </div>
      <div className="additionalText">
        <span>A blogging site for everyone.</span><br />
        <span>Draft to publish in minutes</span>
      </div>
      <Link to={'/write'}>
      <button className="writeBlogButton">Write a blog📝</button>
      </Link>
    </div>
  );
}

export default Header;




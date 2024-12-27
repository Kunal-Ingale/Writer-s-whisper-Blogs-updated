import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Post({ post }) {
  const publicFolder = `${apiBaseUrl}/images/`;  // public folder to add all images

  return (
    <div className='post'>
      <Link to={`/post/${post._id}`} className='link'>
        {post.photo && 
          <img className='postImg' src={publicFolder + post.photo} alt="Post" />
        }
      </Link>
      
      <div className="postInfo">
        <Link className='link' to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        
        <div className="postCats">
          {post.categories && post.categories.map((c) => (
            <Link key={c} to={`/?category=${c}`} className="link">
              <span className="postCat">{c}</span>
            </Link>
          ))}
        </div>
        
        <p className='postDesc'>{post.desc}</p>      
        <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
      </div>
    </div>
  );
}

export default Post;

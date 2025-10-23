import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';

function Post({ post }) {
<<<<<<< HEAD
  const publicFolder = 'https://writers-whisper-blogs-backend.onrender.com/images/';  // public folder to add all images
=======
  const publicFolder = 'https://writer-s-whisper-blogs.vercel.app/images/';  // public folder to add all images
>>>>>>> origin

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

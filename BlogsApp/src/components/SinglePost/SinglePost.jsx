import React, { useContext, useState, useEffect } from 'react';
import './singlePost.css';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../Context/Context';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import api from '../../../utils/api'


function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    //http://localhost:5173/post/66aefa6b63effaf152add1db 
    //['', 'post', 'id 66aefa6b63effaf152add1db']
    const [post, setPost] = useState({});
    const publicFolder = `${apiBaseUrl}/images/`;
    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await api.get(`${apiBaseUrl}/api/posts/` + path);
            // console.log("Post data:", res); 
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost(); // to fecth the post as soon as component unmounts
    }, [path]);

    const handleDelete = async () => {
        try {
            await api.delete(`/api/posts/${post._id}`, { data: { username: user.username } });
            window.location.replace('/');
        } catch (err) {
            console.log("error" + err);
        }
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/api/posts/${post._id}`, {
                username: user.username,
                title,
                desc
            });
            setUpdateMode(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={publicFolder + post.photo} className="singlePostImg" alt={post.title} />
                )}
                {updateMode ? (
                    <input
                        type='text'
                        value={title}
                        className='singlePostTitleInput'
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?username=${post.username}`} className='link'>
                            <b style={{ color: '#1e2971' }}> {post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea
                        className='singlePostDescInput'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className='singlePostDesc'>{desc}</p>
                )}
                {updateMode && (
                    <button className='singlePostButton' onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}

export default SinglePost;

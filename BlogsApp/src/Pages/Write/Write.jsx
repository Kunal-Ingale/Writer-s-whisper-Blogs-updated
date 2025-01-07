import React, { useContext, useState } from 'react';
import './write.css';
import { Context } from '../../Context/Context';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom';



function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categories = cat.split(",");
    // console.log(user);
    
    const newPost = {
      username:user.username,
      title,
      desc,
      categories,
    };
 console.log(user.username);
 
    for (const c of categories) {
      const newCat = { name: c };
      try {
        await api.post(`${apiBaseUrl}/api/categories/`, newCat);
      } catch (error) {
        console.log("Error creating category:", error);
      }
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;

      try {
        await api.post(`${apiBaseUrl}/api/upload`, data);
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }

    try {
      const res = await api.post(`${apiBaseUrl}/api/posts/`, newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='write'>
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="BlogPic"
          className="writeImg"
        />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-upload"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={e => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Enter the Categories separated by , (comma)"
            className="writeInput"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea 
          placeholder='Write the Blog...' 
          type:Text
          className="writeInput writeText" 
          onChange={e =>(setDesc(e.target.value))}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  );
}

export default Write;

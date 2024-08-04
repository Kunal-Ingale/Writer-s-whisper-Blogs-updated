import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import './write.css';
import { Context } from '../../Context/Context';
import axios from 'axios';

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categories = cat.split(",");
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };

    categories.forEach(async (c) => {
      const newCat = { name: c };
      try {
        await axios.post("/api/categories/", newCat);
      } catch (error) {
        console.log("Error creating category:", error);
      }
    });

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;

      try {
        await axios.post('/api/upload', data);
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }

    try {
      const res = await axios.post('/api/posts/', newPost);
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
            placeholder="Enter the Categories with ,"
            className="writeInput"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <ReactQuill
            value={desc}
            onChange={setDesc}
            placeholder="Write the Blog..."
            className="writeText"
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                 {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean']                                         
              ],
            }}
          />
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  );
}

export default Write;

<<<<<<< HEAD
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
=======
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute =  require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute= require('./routes/posts')
const categoryRoute= require('./routes/categories')
const multer = require('multer')
const path = require("path")
const cors = require('cors')
const PORT = process.env.PORT || 5000;

app.use(cors(
    {
         origin: 'https://writer-s-whisper-blogs-frontend.onrender.com',
        methods:["GET","POST", "PUT", "DELETE"],
        credentials:true
    }
));

app.use(cors());
>>>>>>> origin

const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/images/", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.mongoUrl);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage, //right side ->multer.diskStorage(...)
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.status(200).send("File uploaded successfully");
  } else {
    res.status(400).send("File upload failed");
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
=======


app.listen(PORT ,()=>{
    console.log(`running on ${PORT}`);
})
>>>>>>> origin

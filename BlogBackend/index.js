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


dotenv.config();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/images/", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.mongoUrl)

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    
    filename : (req, file, cb) =>{
          cb(null,req.body.name)
        }
    })

const upload = multer({
    storage:storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
})
app.post('/api/upload',upload.single('file'),(req,res)=>{
    if (req.file) {
        res.status(200).send('File uploaded successfully');
      } else {
        res.status(400).send('File upload failed');
      }
})

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/categories',categoryRoute)

app.listen("5000" ,()=>{
    console.log("running on 5000");
})
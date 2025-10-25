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
const cors = require("cors");


const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use(cors({
  origin: [
    "http://localhost:5173", // your React app (local dev)
    "https://writer-s-whisper.vercel.app" // your deployed frontend
  ],
  credentials: true,
}));

app.use("/images/", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.mongoUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

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
    res.status(200).json({ filename: req.file.filename });
  } else {
    res.status(400).json({ error: "File upload failed" });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});

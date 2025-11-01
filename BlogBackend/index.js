const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Load environment variables FIRST
dotenv.config();

// Railway automatically provides PORT
const PORT = process.env.PORT || 8080;

// ✅ Quick debug route for Railway
app.get("/ping", (req, res) => res.send("pong"));

// CORS Configuration
const allowedOrigins = [
  "https://writer-s-whisper-blogs.vercel.app", // Your frontend on Vercel
  "http://localhost:3000", // Local React
  "http://localhost:5173", // Local Vite
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow Postman or curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("⚠️ CORS blocked request from:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log("📁 Created images directory");
}

// Serve static files
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ Start server early (before Mongo) to confirm Railway connection
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Allowed origins:`, allowedOrigins);
});
server.on("error", (err) => console.error("❌ Server failed to start:", err));

// MongoDB Connection
mongoose
  .connect(process.env.mongoUrl)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) => {
    const uniqueName = req.body.name || Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only image files are allowed!"));
  },
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running",
    status: "success",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      users: "/api/users",
      posts: "/api/posts",
      categories: "/api/categories",
      upload: "/api/upload",
    },
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (req.file) {
      console.log("✅ File uploaded:", req.file.filename);
      res.status(200).json({
        message: "File uploaded successfully",
        filename: req.file.filename,
        path: `/images/${req.file.filename}`,
      });
    } else {
      res.status(400).json({ message: "File upload failed" });
    }
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
});

// API routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File too large. Maximum size is 50MB",
      });
    }
    return res.status(400).json({
      message: "File upload error",
      error: err.message,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received: closing HTTP server");
  mongoose.connection.close(false, () => {
    console.log("💾 MongoDB connection closed");
    process.exit(0);
  });
});

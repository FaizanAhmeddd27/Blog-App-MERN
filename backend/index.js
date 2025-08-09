import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//  Cloudinary Setup 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

// Middleware 

// Parse cookies
app.use(cookieParser());

// CORS for frontend access
app.use(cors({
  origin: 'process.env.FRONTEND_URL', // or use process.env.FRONTEND_URL
  credentials: true,
}));

// Parse incoming JSON and form data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload support
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
}));


// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

//  Routes 
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);



// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


app.get('/',(req,res)=>{
  res.send({
    activeStatus: true,
    error: false
  })
})
// Start Server 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

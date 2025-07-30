import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

const app = express()

// Cloudinary configuration (should be before routes if used in controllers)
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
})

// Middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

// Port configuration
const port = process.env.PORT || 3000

// Database connection
 mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })

// Routes
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
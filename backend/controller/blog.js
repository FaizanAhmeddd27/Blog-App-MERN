import Blog from "../model/blog.js"
import { v2 as cloudinary } from "cloudinary";
import User from "../model/user.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
    // console.log('BODY:', req.body);
    // console.log('FILES:', req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'Blog Image is required' });
    }

    const { blogImage } = req.files;
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(blogImage.mimetype)) {
        return res.status(400).json({ message: 'Only JPEG and PNG files are allowed' });
    }

    const { title, category, about } = req.body;

    try {
        if (!title || !category || !about || !blogImage) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo.url;
        const createdBy = req?.user?._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

        if (!cloudinaryResponse) {
            return res.status(500).json({ message: 'Failed to upload photo' });
        }

        const photo = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url
        };

        const blogData = {
            title,
            blogImage: photo,
            category,
            about,
            adminName,
            adminPhoto,
            createdBy
        };

        const blog = await Blog.create(blogData);

        res.status(201).json({
            message: 'Blog created successfully',
            blog
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await Blog.deleteOne({ _id: id });
        res.status(200).json({ message: 'Blog deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).json({
            message: 'Blogs fetched successfully',
            allBlogs
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getSingleBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({
            message: 'Blog fetched successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const myBlogs = async (req, res) => {
    const userId = req.user._id;

    try {
        const blogs = await Blog.find({ createdBy: userId });
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found for this user' });
        }
        res.status(200).json({
            message: 'User blogs fetched successfully',
            blogs
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const updateBlog = async (req, res) => {
   
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Blog id" });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        
        const { title, category, about } = req.body || {};
        if (title) blog.title = title;
        if (category) blog.category = category;
        if (about) blog.about = about;

        // If a new image is uploaded
        if (req.files && req.files.blogImage) {
            const blogImage = req.files.blogImage;
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(blogImage.mimetype)) {
                return res.status(400).json({ message: 'Only JPEG and PNG files are allowed' });
            }
            const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
            if (!cloudinaryResponse) {
                return res.status(500).json({ message: 'Failed to upload photo' });
            }
            blog.blogImage = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            };
        }

        await blog.save();

        res.status(200).json({
            message: 'Blog updated successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
import User from '../model/user.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt';
import generateToken from '../jwt/token.js';

export const register = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'User photo is required' });
    }

    const photoFile = req.files.photo;
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(photoFile.mimetype)) {
        return res.status(400).json({ message: 'Only JPEG and PNG files are allowed' });
    }
    const { name, email, password, phoneNo, role, education } = req.body;
    try {
        if (!name || !email || !password || !phoneNo || !education || !photoFile) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(photoFile.tempFilePath);

        if (!cloudinaryResponse) {
            return res.status(500).json({ message: 'Failed to upload photo' });
        }
        const photo = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url
        };

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            role,
            photo,
            education,
        });

        await newUser.save();
        const token = generateToken(newUser._id, res);
       
        newUser.token = token;
        await newUser.save();

        // Exclude password from response
        const { password: _, ...userData } = newUser._doc;

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userData, 
            token 
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const login = async (req, res) => {
    const { role, email, password } = req.body;

    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        if (user.role !== role) {
            return res.status(403).json({ message: 'Role mismatch: Unauthorized access' });
        }

        const token = generateToken(user._id, res);

        user.token = token;
        await user.save();
        const { password: _, ...userData } = user._doc;

        res.status(200).json({ 
            message: 'Login successful', 
            user: userData, 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

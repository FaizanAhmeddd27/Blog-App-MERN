import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const generateToken = ( userId,res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });

  // Set JWT as cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
    sameSite: 'Strict', // CSRF protection
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in ms
  });

   return token; 
};

export default generateToken;

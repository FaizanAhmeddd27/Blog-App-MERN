import jwt from 'jsonwebtoken';
import User from '../model/user.js';


export const authUser = async (req, res, next) => {
  const token = req.cookies.jwt;
//   console.log('Cookies:', req.cookies);
// console.log('Token:', req.cookies.jwt);


  console.log('Token from cookie:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access - no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password -token');

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    

    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ message: 'User not authenticated', error: error.message });
  }
};

export const authAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
};

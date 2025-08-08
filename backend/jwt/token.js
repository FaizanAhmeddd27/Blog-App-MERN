import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: false,
    secure: false, 
    sameSite: 'none',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });

  return token;
};

export default generateToken;
 
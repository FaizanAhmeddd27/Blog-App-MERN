import express from 'express';
import { register , login, logout} from '../controller/user.js';

const router = express.Router();

// Example route for user registration
router.post('/register', register);
router.post('/login', login)
router.get('/logout', logout)

export default router;


import express from 'express';
import { register , login, logout} from '../controller/user.js';
// import { authUser } from '../middleware/AuthUser.js';
import {authUser} from '../middleware/AuthUser.js';
import { getAdmins } from '../controller/user.js';
import { myProfile } from '../controller/user.js';

const router = express.Router();

// Example route for user registration
router.post('/register', register);
router.post('/login', login)
router.post('/logout',authUser,logout);
router.get('/admins',getAdmins )
router.get('/myProfile',authUser, myProfile);



export default router;




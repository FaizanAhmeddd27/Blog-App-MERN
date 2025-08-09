import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog , myBlogs, updateBlog} from "../controller/blog.js";
import { authAdmin, authUser } from "../middleware/AuthUser.js";


const router = express.Router();

// Route to create a new blog

router.post('/create', authUser, authAdmin("admin") , createBlog);
router.delete('/delete/:id', authUser, authAdmin("admin"), deleteBlog);
router.get('/allBlogs',  getAllBlogs);
router.get('/singleBlog/:id',  getSingleBlog);
router.get('/myBlogs/:id', authUser,authAdmin("admin"), myBlogs)
router.put('/update/:id',authUser, authAdmin("admin"), updateBlog);
export default router;


 
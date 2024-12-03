import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, addComment, getCommentsByBlogId, getBlogByAuthorId } from "../controllers/blog.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";  
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Blog Routes
router.post("/createPost", isAuthenticated, singleUpload, createBlog);  // working
router.get("/getPosts", getAllBlogs);  //working
router.get("/:id", getBlogById); //working 
router.get("/author/:id", getBlogByAuthorId); //working 
router.delete("/author/delete/:id", isAuthenticated, deleteBlog);  //working

// Comment Routes
router.post("/:blogId/comments", isAuthenticated, addComment);  // working
router.get("/:blogId/comments", getCommentsByBlogId);  // working

export default router;

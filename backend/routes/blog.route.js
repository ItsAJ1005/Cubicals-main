import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, addComment, getCommentsByBlogId } from "../controllers/blog.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";  

const router = express.Router();

// Blog Routes
router.post("/create", isAuthenticated, createBlog);  // working
router.get("/", getAllBlogs);  //working
router.get("/:id", getBlogById); //working 
// router.delete("/:id", isAuthenticated, deleteBlog);  //working

// Comment Routes
router.post("/:blogId/comments", isAuthenticated, addComment);  // working
router.get("/:blogId/comments", getCommentsByBlogId);  // working

export default router;

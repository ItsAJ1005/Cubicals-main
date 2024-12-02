import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";


// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, image } = req.body;
        const newBlog = new Blog({
            title,
            content,
            author: req.id, 
            tags,
            image,
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "fullname email");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "fullname email");
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error });
    }
};

// Update a blog
export const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
};

// Add a comment to a blog
export const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const newComment = new Comment({
            content,
            author: req.id,
            blog: req.params.blogId,
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
};

// Get all comments for a specific blog
export const getCommentsByBlogId = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId }).populate("author", "fullname email");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};

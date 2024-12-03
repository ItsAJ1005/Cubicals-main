import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from 'cloudinary';

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, image, author } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required." });
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            image, 
            tags: tags.split(','),
        });

        await newBlog.save();
        res.status(201).json({ success: true, message: 'Blog post created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
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

// Get blogs by Author ID
export const getBlogByAuthorId = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.params.id }).populate("author", "fullname email");
        if (blogs.length === 0) return res.status(200).json({ blogs:[], message: "No blogs found for this author" });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs by author", error });
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
        if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, message: "Blog deleted successfully", deletedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
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

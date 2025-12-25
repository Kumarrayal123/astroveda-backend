import Blog from "../models/Blog.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        let image = "";

        if (req.file) {
            image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        } else if (req.body.image) {
            image = req.body.image; // Fallback to URL if provided (though form normally sends file)
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()), // Handle tags
            image
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

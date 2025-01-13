const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Get all blogs
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blog', details: err.message });
    }
});

// Create a new blog
router.post('/', async (req, res) => {
    console.log('Incoming Request Body:', req.body); // Debug the request body

    const { title, content, author } = req.body;

    // Validate fields
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'All fields (title, content, author) are required.' });
    }

    try {
        const newBlog = new Blog({ title, content, author });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});




// Update a blog
router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

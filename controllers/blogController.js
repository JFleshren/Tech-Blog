const router = require('express').Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

const blogController = {
  getHomePage: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.render('home', { posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const newPost = await Post.create({ title, content, UserId: req.session.user.id });
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post' });
    }
  },

  getPost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id, {
        include: [Comment]
      });
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.render('post', { post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.UserId !== req.session.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      await post.update({ title, content });
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Error updating post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.UserId !== req.session.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Error deleting post' });
    }
  },

  addComment: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      if (!content) {
        return res.status(400).send('Comment content is required');
      }
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      const comment = await Comment.create({ content, PostId: id });
      res.status(201).send('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('Internal Server Error');
    
  }
},

  getDashboard: async (req, res) => {
    try {
      // Retrieve user-specific data for the dashboard
      const userPosts = await Post.findAll({ where: { UserId: req.session.user.id } });
      // Render the dashboard view with the user-specific data
      res.render('dashboard', { userPosts });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = blogController;

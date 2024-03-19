const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { isAuthenticated } = require('../authMiddleware');

router.get('/', blogController.getHomePage);
router.get('/post/:id', blogController.getPost);
router.get('/dashboard', isAuthenticated, blogController.getDashboard);
router.post('/post/:id/comment', isAuthenticated, blogController.addComment);
router.post('/dashboard/post', isAuthenticated, blogController.createPost);
router.post('/post', isAuthenticated, blogController.createPost);
router.put('/dashboard/post/:id', isAuthenticated, blogController.updatePost);
router.put('/post/:id', isAuthenticated, blogController.updatePost);
router.delete('/dashboard/post/:id', isAuthenticated, blogController.deletePost);
router.delete('/post/:id', isAuthenticated, blogController.deletePost);

module.exports = router;

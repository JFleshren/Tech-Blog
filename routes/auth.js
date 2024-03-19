const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/logout', authController.logout);

module.exports = router;

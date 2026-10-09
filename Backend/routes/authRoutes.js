/**
 * CareerSync Capstone Project
 * 
 * @module Backend/Routes/Auth
 * @description API route definitions for authentication and authorization.
 * Handles user registration, login, JWT token verification, and password recovery.
 * Protected routes utilize the authMiddleware.
 */
const express = require('express');
const { register, login, googleAuth, verifyOtp, getMe, logout, forgotPassword } = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/github', githubAuth);
router.post('/microsoft', microsoftAuth);
router.post('/verify-otp', verifyOtp);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);

module.exports = router;


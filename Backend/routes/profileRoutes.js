const express = require('express');
const { getMyProfile, createOrUpdateProfile, getProfiles } = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for student to manage their own profile
router.route('/me')
    .get(protect, authorize('student'), getMyProfile);

router.route('/')
    .post(protect, authorize('student'), createOrUpdateProfile)
    .get(protect, authorize('faculty', 'industry', 'tpo', 'admin'), getProfiles);

module.exports = router;

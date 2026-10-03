const express = require('express');
const router = express.Router();
const { getPendingVerifications, verifyUser, getSystemStats } = require('../controllers/adminController');

// In a real application, you would add an admin protection middleware here
// e.g., router.use(protect, authorize('admin'));

router.get('/verifications/pending', getPendingVerifications);
router.put('/verifications/:id', verifyUser);
router.get('/stats', getSystemStats);

module.exports = router;

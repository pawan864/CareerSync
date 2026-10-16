const express = require('express');
const router = express.Router();
const {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
} = require('../controllers/notificationController');

// Public route to fetch notifications for ticker and drawer
router.get('/', getNotifications);

// Management routes for Admin Dashboard
router.post('/', createNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

module.exports = router;

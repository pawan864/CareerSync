const Notification = require('../models/Notification');

// Default initial circulars to seed if DB is empty
const defaultSeedNotices = [
    {
        category: 'drives',
        sender: 'Training & Placement Office',
        senderRole: 'Official Circular',
        title: 'TCS & Wipro On-Campus Recruitment Drive 2026',
        description: 'Registration window closes tonight at 11:59 PM. Ensure your latest semester CGPA is updated in your profile before submitting.',
        priority: 'high',
        actionText: 'View Eligibility',
        actionUrl: '/login',
        isActive: true,
        isTicker: true
    },
    {
        category: 'events',
        sender: 'Career Advisory Cell',
        senderRole: 'Event Bulletin',
        title: 'Virtual Campus Placement Fair 2026',
        description: 'Interactive booth slots for 40+ national recruiters are now open. Reserve your 1-on-1 mock interview sessions.',
        priority: 'normal',
        actionText: 'Reserve Slot',
        actionUrl: '/register',
        isActive: true,
        isTicker: true
    },
    {
        category: 'notices',
        sender: 'CareerSync Assessment Team',
        senderRole: 'Evaluation',
        title: 'Skill-Gap Benchmark Matrix Ready',
        description: 'Your personalized branch assessment is processed. 3 in-demand industry competencies identified for your profile.',
        priority: 'normal',
        actionText: 'Open Assessment',
        actionUrl: '/skill-gap',
        isActive: true,
        isTicker: true
    },
    {
        category: 'drives',
        sender: 'Institutional Verification',
        senderRole: 'Student Registry',
        title: 'Resume & Academic Record Verified',
        description: 'Your master credentials have been approved by the institution coordinator. You are now eligible for tier-1 corporate drives.',
        priority: 'normal',
        actionText: 'Review Profile',
        actionUrl: '/login',
        isActive: true,
        isTicker: false
    },
    {
        category: 'academic',
        sender: 'Portal Administration',
        senderRole: 'Documentation',
        title: 'CareerSync Platform Guidelines & User Manual',
        description: 'Official student code of conduct, interview attendance rules, and step-by-step portal usage guide.',
        priority: 'normal',
        actionText: 'Open Manual (PDF)',
        isManual: true,
        actionUrl: '',
        isActive: true,
        isTicker: false
    }
];

// @desc    Get all notifications (Public for active, admin query for all)
// @route   GET /api/notifications
// @access  Public / Admin
exports.getNotifications = async (req, res) => {
    try {
        const count = await Notification.countDocuments();
        if (count === 0) {
            await Notification.insertMany(defaultSeedNotices);
        }

        const filter = req.query.all === 'true' ? {} : { isActive: true };
        const notifications = await Notification.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, error: 'Server Error fetching notifications' });
    }
};

// @desc    Create a new notification
// @route   POST /api/notifications
// @access  Admin
exports.createNotification = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            sender,
            senderRole,
            priority,
            actionText,
            actionUrl,
            isManual,
            isActive,
            isTicker,
            createdAt
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, error: 'Title and description are required' });
        }

        const notificationData = {
            title,
            description,
            category: category || 'notices',
            sender: sender || 'Training & Placement Office',
            senderRole: senderRole || 'Official Circular',
            priority: priority || 'normal',
            actionText: actionText !== undefined ? actionText : '',
            actionUrl: actionUrl !== undefined ? actionUrl : '',
            isManual: Boolean(isManual),
            isActive: isActive !== undefined ? isActive : true,
            isTicker: isTicker !== undefined ? isTicker : true
        };

        if (createdAt) {
            notificationData.createdAt = new Date(createdAt);
        }

        const notification = await Notification.create(notificationData);

        res.status(201).json({
            success: true,
            data: notification
        });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ success: false, error: error.message || 'Server Error' });
    }
};

// @desc    Update a notification
// @route   PUT /api/notifications/:id
// @access  Admin
exports.updateNotification = async (req, res) => {
    try {
        const updateData = { ...req.body };
        delete updateData._id;
        delete updateData.__v;

        // Allow message time update from Admin Dashboard
        if (req.body.createdAt) {
            updateData.createdAt = new Date(req.body.createdAt);
        } else if (req.body.updateMessageTime) {
            updateData.createdAt = new Date();
        }

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!notification) {
            return res.status(404).json({ success: false, error: 'Notification not found' });
        }

        res.status(200).json({
            success: true,
            data: notification
        });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ success: false, error: error.message || 'Server Error' });
    }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Admin
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);

        if (!notification) {
            return res.status(404).json({ success: false, error: 'Notification not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Notification removed successfully'
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

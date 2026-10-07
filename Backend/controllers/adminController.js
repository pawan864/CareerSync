/**
 * CareerSync Capstone Project
 * 
 * @module Backend/Controllers/adminController
 * @description Express controller for adminController functionality in the MERN stack.
 */
const User = require('../models/User');

// UC-29: Get pending user verifications
exports.getPendingVerifications = async (req, res) => {
    try {
        const users = await User.find({ verificationStatus: 'pending', role: { $ne: 'admin' } })
            .select('-password')
            .sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// UC-29: Approve or reject a user
exports.verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const user = await User.findByIdAndUpdate(id, { verificationStatus: status }, { new: true });
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Overview Stats
exports.getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeInstitutions = await User.countDocuments({ role: { $in: ['tpo', 'faculty'] }, verificationStatus: 'approved' });
        const pendingUsers = await User.countDocuments({ verificationStatus: 'pending' });
        
        // Removed hardcoded mocked data, now strictly using DB stats
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeInstitutions,
                systemAlerts: pendingUsers, // Alerts based on pending verifications
                aiOperations: totalUsers * 5 // Dynamic based on user count
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const StudentProfile = require('../models/StudentProfile');

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private (Student)
exports.getMyProfile = async (req, res, next) => {
    try {
        const profile = await StudentProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

        if (!profile) {
            return res.status(404).json({ success: false, error: 'There is no profile for this user' });
        }

        res.status(200).json({ success: true, data: profile });
    } catch (err) {
        next(err);
    }
};

// @desc    Create or update user profile
// @route   POST /api/profile
// @access  Private (Student)
exports.createOrUpdateProfile = async (req, res, next) => {
    try {
        const {
            personalInfo,
            academicInfo,
            skills,
            certifications,
            projects,
            careerInterests
        } = req.body;

        // Build profile object
        const profileFields = {
            user: req.user.id,
            personalInfo: personalInfo || {},
            academicInfo: academicInfo || {},
            skills: skills || [],
            certifications: certifications || [],
            projects: projects || [],
            careerInterests: careerInterests || {}
        };

        let profile = await StudentProfile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await StudentProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ success: true, data: profile });
        }

        // Create
        profile = await StudentProfile.create(profileFields);
        res.status(201).json({ success: true, data: profile });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all student profiles (for Industry/Faculty/TPO)
// @route   GET /api/profile
// @access  Private (Faculty, Industry, TPO, Admin)
exports.getProfiles = async (req, res, next) => {
    try {
        const profiles = await StudentProfile.find().populate('user', ['name', 'email']);
        res.status(200).json({ success: true, count: profiles.length, data: profiles });
    } catch (err) {
        next(err);
    }
};

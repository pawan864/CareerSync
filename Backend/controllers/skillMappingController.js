const StudentProfile = require('../models/StudentProfile');
const IndustryRole = require('../models/IndustryRole');

const skillLevelMap = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Expert': 4
};

// @desc    Get skill gap analysis for a student against a target role
// @route   GET /api/skills/gap/:roleId
// @access  Private (Student, Faculty, TPO)
exports.getSkillGap = async (req, res, next) => {
    try {
        const targetRole = await IndustryRole.findById(req.params.roleId);
        if (!targetRole) {
            return res.status(404).json({ success: false, error: 'Target role not found' });
        }

        // Assume checking current user's profile, if faculty/TPO is checking, we can accept studentId in query
        const userId = req.query.studentId || req.user.id;
        
        const profile = await StudentProfile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ success: false, error: 'Student profile not found' });
        }

        const studentSkills = profile.skills || [];
        const requiredSkills = targetRole.requiredSkills || [];

        let matchedSkills = [];
        let missingSkills = [];
        let upgradeNeededSkills = []; // Have the skill but lower level than required

        requiredSkills.forEach(reqSkill => {
            const studentSkill = studentSkills.find(s => s.name.toLowerCase() === reqSkill.name.toLowerCase());

            if (!studentSkill) {
                missingSkills.push(reqSkill);
            } else {
                const reqLevelValue = skillLevelMap[reqSkill.level] || 1;
                const stuLevelValue = skillLevelMap[studentSkill.level] || 1;

                if (stuLevelValue >= reqLevelValue) {
                    matchedSkills.push({
                        name: reqSkill.name,
                        requiredLevel: reqSkill.level,
                        currentLevel: studentSkill.level
                    });
                } else {
                    upgradeNeededSkills.push({
                        name: reqSkill.name,
                        requiredLevel: reqSkill.level,
                        currentLevel: studentSkill.level
                    });
                }
            }
        });

        const totalReq = requiredSkills.length;
        const totalMatched = matchedSkills.length;
        const matchPercentage = totalReq === 0 ? 100 : Math.round((totalMatched / totalReq) * 100);

        // Generate personalized learning recommendations (UC-04) based on gaps
        let recommendations = [];
        [...missingSkills, ...upgradeNeededSkills].forEach(skill => {
            recommendations.push({
                type: 'Course',
                title: `Advanced ${skill.name} Masterclass`,
                reason: `Required for ${targetRole.title} role`
            });
            recommendations.push({
                type: 'Project',
                title: `Build a ${skill.name} App`,
                reason: `Demonstrate your proficiency in ${skill.name}`
            });
        });

        res.status(200).json({
            success: true,
            data: {
                roleInfo: {
                    id: targetRole._id,
                    title: targetRole.title
                },
                matchPercentage,
                analysis: {
                    matchedSkills,
                    missingSkills,
                    upgradeNeededSkills
                },
                recommendations
            }
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all predefined industry roles
// @route   GET /api/skills/roles
// @access  Private
exports.getIndustryRoles = async (req, res, next) => {
    try {
        const roles = await IndustryRole.find();
        res.status(200).json({ success: true, count: roles.length, data: roles });
    } catch (err) {
        next(err);
    }
};

// @desc    Create an industry role (for Admin/TPO/Industry)
// @route   POST /api/skills/roles
// @access  Private
exports.createIndustryRole = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.id;
        const role = await IndustryRole.create(req.body);
        res.status(201).json({ success: true, data: role });
    } catch (err) {
        next(err);
    }
};

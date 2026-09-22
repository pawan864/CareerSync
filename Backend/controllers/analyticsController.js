const StudentProfile = require('../models/StudentProfile');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const CompanyProfile = require('../models/CompanyProfile');

// @desc    Get dashboard analytics for Faculty / TPO / Admin
// @route   GET /api/analytics
// @access  Private (Faculty, TPO, Admin)
exports.getAnalytics = async (req, res, next) => {
    try {
        // Basic Stats
        const totalStudents = await StudentProfile.countDocuments();
        const totalCompanies = await CompanyProfile.countDocuments();
        const totalOpportunities = await Opportunity.countDocuments();
        const totalApplications = await Application.countDocuments();

        // Application Status Breakdown
        const applications = await Application.find();
        const appStatus = {
            Applied: 0,
            Shortlisted: 0,
            Interview: 0,
            Selected: 0,
            'Not Selected': 0
        };
        applications.forEach(app => {
            if(appStatus[app.status] !== undefined) {
                appStatus[app.status]++;
            }
        });

        // Skill Demands (Top Required Skills from Opportunities)
        const opportunities = await Opportunity.find();
        const skillDemandCount = {};
        opportunities.forEach(opp => {
            opp.requiredSkills.forEach(skill => {
                const name = skill.name.toLowerCase();
                skillDemandCount[name] = (skillDemandCount[name] || 0) + 1;
            });
        });
        
        // Sort top skills
        const topRequiredSkills = Object.entries(skillDemandCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(item => ({ name: item[0], count: item[1] }));

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalStudents,
                    totalCompanies,
                    totalOpportunities,
                    totalApplications,
                    placements: appStatus.Selected
                },
                applicationStatus: appStatus,
                topRequiredSkills
            }
        });
    } catch (err) {
        next(err);
    }
};

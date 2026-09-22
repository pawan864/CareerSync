const express = require('express');
const { getSkillGap, getIndustryRoles, createIndustryRole } = require('../controllers/skillMappingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/gap/:roleId')
    .get(protect, getSkillGap);

router.route('/roles')
    .get(protect, getIndustryRoles)
    .post(protect, authorize('admin', 'tpo', 'industry'), createIndustryRole);

module.exports = router;

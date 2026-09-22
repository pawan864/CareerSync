const express = require('express');
const { 
    getOpportunities, 
    createOpportunity, 
    applyForOpportunity, 
    getCompanyApplications,
    getMyApplications
} = require('../controllers/opportunityController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getOpportunities)
    .post(protect, authorize('industry', 'admin', 'tpo'), createOpportunity);

router.post('/:id/apply', protect, authorize('student'), applyForOpportunity);

router.get('/company/applications', protect, authorize('industry'), getCompanyApplications);
router.get('/my-applications', protect, authorize('student'), getMyApplications);

module.exports = router;

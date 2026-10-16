const express = require('express');
const router = express.Router();
const { 
    getVerifications, 
    getPendingVerifications, 
    verifyUser, 
    batchVerifyUsers,
    deleteUser,
    getSystemStats,
    getModerationOverview,
    getModeratedOpportunities,
    moderateOpportunity,
    deleteOpportunityAdmin,
    getModerationReports,
    createModerationReport,
    updateModerationReport,
    deleteModerationReport,
    getDatabaseOverview,
    getCollectionDocuments,
    exportCollectionData,
    runDatabaseDiagnostic,
    pruneAuditLogs,
    getAccessControlList,
    getRoleAccessControl,
    updateRoleAccessControl,
    toggleSidebarItem,
    updateSidebarItem,
    addSidebarItem,
    deleteSidebarItem,
    resetRoleDefaults,
    simulatePortalSession,
    getPublicRoleNav
} = require('../controllers/adminController');

router.get('/verifications', getVerifications);
router.get('/verifications/pending', getPendingVerifications);
router.put('/verifications/:id', verifyUser);
router.post('/verifications/batch', batchVerifyUsers);
router.delete('/verifications/:id', deleteUser);
router.get('/stats', getSystemStats);

// Content & Opportunity Moderation Routes
router.get('/moderation/overview', getModerationOverview);
router.get('/moderation/opportunities', getModeratedOpportunities);
router.put('/moderation/opportunities/:id', moderateOpportunity);
router.delete('/moderation/opportunities/:id', deleteOpportunityAdmin);
router.get('/moderation/reports', getModerationReports);
router.post('/moderation/reports', createModerationReport);
router.put('/moderation/reports/:id', updateModerationReport);
router.delete('/moderation/reports/:id', deleteModerationReport);

// Database Management & Telemetry Routes
router.get('/database/overview', getDatabaseOverview);
router.get('/database/collection/:name', getCollectionDocuments);
router.get('/database/export/:name', exportCollectionData);
router.post('/database/maintenance/diagnostic', runDatabaseDiagnostic);
router.post('/database/maintenance/prune-logs', pruneAuditLogs);

// Access Control & Multi-Dashboard Navigation Matrix Routes
router.get('/access-control', getAccessControlList);
router.get('/access-control/role/:role', getRoleAccessControl);
router.put('/access-control/role/:role', updateRoleAccessControl);
router.patch('/access-control/sidebar-toggle', toggleSidebarItem);
router.patch('/access-control/sidebar-item', updateSidebarItem);
router.post('/access-control/sidebar-item', addSidebarItem);
router.delete('/access-control/sidebar-item', deleteSidebarItem);
router.post('/access-control/reset-defaults', resetRoleDefaults);
router.post('/access-control/switch-portal', simulatePortalSession);
router.get('/access-control/public/:role', getPublicRoleNav);

module.exports = router;

